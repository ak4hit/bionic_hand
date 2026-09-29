import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { TRANSITION_FRAMES } from "./constants";
import { ActuationScene } from "./scenes/ActuationScene";
import { CadOverviewScene } from "./scenes/CadOverviewScene";
import { FingerScene } from "./scenes/FingerScene";
import { OutroScene } from "./scenes/OutroScene";
import { PalmScene } from "./scenes/PalmScene";
import { SensingScene } from "./scenes/SensingScene";
import { ThumbScene } from "./scenes/ThumbScene";
import { TitleScene } from "./scenes/TitleScene";
import { HandiDemoProps, SceneProps } from "./types";

export const HandiDemo: React.FC<HandiDemoProps> = ({ scenes }) => {
  const renderScene = (sceneProps: SceneProps) => {
    switch (sceneProps.scene) {
      case 1:
        return <TitleScene {...sceneProps} />;
      case 2:
        return <CadOverviewScene {...sceneProps} />;
      case 3:
        return <FingerScene {...sceneProps} />;
      case 4:
        return <ThumbScene {...sceneProps} />;
      case 5:
        return <ActuationScene {...sceneProps} />;
      case 6:
        return <SensingScene {...sceneProps} />;
      case 7:
        return <PalmScene {...sceneProps} />;
      case 8:
        return <OutroScene {...sceneProps} />;
      default:
        return <TitleScene {...sceneProps} />;
    }
  };

  return (
    <TransitionSeries>
      {scenes.map((sceneProps, index) => {
        return (
          <React.Fragment key={sceneProps.id}>
            <TransitionSeries.Sequence durationInFrames={sceneProps.durationInFrames}>
              {renderScene(sceneProps)}
            </TransitionSeries.Sequence>
            {index < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />
            )}
          </React.Fragment>
        );
      })}
    </TransitionSeries>
  );
};
