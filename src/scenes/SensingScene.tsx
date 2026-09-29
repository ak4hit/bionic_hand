import React from "react";
import { Audio, staticFile } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { Counter } from "../components/Counter";
import { ImageCard } from "../components/ImageCard";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const SensingScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        padding: "65px 90px 140px 90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 24,
      }}
    >
      <Audio src={staticFile("voice/scene6.mp3")} />
      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Header Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: 10,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
            <Chip label="SENSOR INTEGRATION" delay={2} highlight />
            <Chip label="ANALOG FEEDBACK" delay={8} />
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 36,
              fontWeight: 800,
              color: COLORS.textPrimary,
              margin: 0,
            }}
          >
            Dual-Modality Proprioception & Tactile Sensing
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: COLORS.textSecondary,
            maxWidth: 520,
            textAlign: "right",
            margin: 0,
          }}
        >
          High-frequency real-time state estimation for machine learning policies and reflex control
        </p>
      </div>

      {/* Center: Two Images Side by Side */}
      <div
        style={{
          display: "flex",
          gap: 32,
          height: 300,
          width: "100%",
        }}
      >
        <div style={{ flex: 1, height: "100%" }}>
          <ImageCard
            src="images/potentiometers.png"
            alt="Joint Angle Potentiometers"
            badge="9x Joint Potentiometers"
            delay={10}
            enableKenBurns
            height={300}
          />
        </div>

        <div style={{ flex: 1, height: "100%" }}>
          <ImageCard
            src="images/fingertip_finished.png"
            alt="Fingertip Force Sensor"
            badge="5x Tactile Force Sensors"
            delay={20}
            enableKenBurns
            height={300}
          />
        </div>
      </div>

      {/* Bottom: Animated Counters */}
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
        }}
      >
        <Counter
          value={9}
          label="Joint-Angle Potentiometers"
          sublabel="Rotary potentiometers at each joint measure continuous position"
          delay={25}
          accentColor={COLORS.accentOrange}
        />
        <Counter
          value={5}
          label="Fingertip Force Sensors"
          sublabel="Force-sensitive resistors (FSR) measure grasp and contact pressure"
          delay={45}
          accentColor={COLORS.accentBlue}
        />
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
