import React from "react";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { CalculateMetadataFunction, Composition, staticFile } from "remotion";
import {
  DEFAULT_SCENES_CONFIG,
  FPS,
  HEIGHT,
  SCENE_PADDING_SECONDS,
  TRANSITION_FRAMES,
  WIDTH,
} from "./constants";
import { HandiDemo } from "./HandiDemo";
import { HandiDemoProps, SceneProps } from "./types";
import "./index.css";

// Load Google Fonts
loadSpaceGrotesk("normal", { weights: ["500", "600", "700"], subsets: ["latin"], ignoreTooManyRequestsWarning: true });
loadInter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin"], ignoreTooManyRequestsWarning: true });

// Construct initial fallback props
const defaultScenes: SceneProps[] = DEFAULT_SCENES_CONFIG.map((cfg) => {
  const durationInSeconds = cfg.fallbackDuration + SCENE_PADDING_SECONDS;
  const durationInFrames = Math.ceil(durationInSeconds * FPS);
  return {
    id: cfg.id,
    scene: cfg.scene,
    name: cfg.name,
    topic: cfg.topic,
    text: cfg.text,
    durationInFrames,
    audioDuration: cfg.fallbackDuration,
    words: [],
  };
});

const defaultTotalFrames =
  defaultScenes.reduce((acc, s) => acc + s.durationInFrames, 0) -
  (defaultScenes.length - 1) * TRANSITION_FRAMES;

const calculateMetadata: CalculateMetadataFunction<HandiDemoProps> = async ({
  defaultProps,
}) => {
  const scenesToProcess = defaultProps.scenes || defaultScenes;

  const scenesWithDuration: SceneProps[] = await Promise.all(
    scenesToProcess.map(async (cfg) => {
      const audioPath = staticFile(`voice/${cfg.id}.mp3`);
      let audioDuration = cfg.audioDuration || 6;

      try {
        const measured = await getAudioDurationInSeconds(audioPath);
        if (measured && !isNaN(measured) && measured > 0) {
          audioDuration = measured;
        }
      } catch (err) {
        console.warn(`Could not measure audio duration for ${cfg.id}:`, err);
      }

      let words = cfg.words || [];
      try {
        const jsonPath = staticFile(`voice/${cfg.id}.json`);
        const res = await fetch(jsonPath);
        if (res.ok) {
          const json = await res.json();
          if (json.words && json.words.length > 0) {
            words = json.words;
          }
        }
      } catch (err) {
        console.warn(`Could not load word timings for ${cfg.id}:`, err);
      }

      const durationInSeconds = audioDuration + SCENE_PADDING_SECONDS;
      const durationInFrames = Math.max(30, Math.ceil(durationInSeconds * FPS));

      return {
        id: cfg.id,
        scene: cfg.scene,
        name: cfg.name,
        topic: cfg.topic,
        text: cfg.text,
        durationInFrames,
        audioDuration,
        words,
      };
    })
  );

  const totalFrames =
    scenesWithDuration.reduce((acc, s) => acc + s.durationInFrames, 0) -
    (scenesWithDuration.length - 1) * TRANSITION_FRAMES;

  console.log(
    "calculateMetadata totalFrames:",
    totalFrames,
    scenesWithDuration.map((s) => `${s.id}: ${s.durationInFrames}`)
  );

  return {
    durationInFrames: totalFrames,
    props: {
      scenes: scenesWithDuration,
    },
  };
};

export const Root: React.FC = () => {
  return (
    <Composition<any, HandiDemoProps>
      id="HandiDemo"
      component={HandiDemo}
      durationInFrames={defaultTotalFrames}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{
        scenes: defaultScenes,
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};
