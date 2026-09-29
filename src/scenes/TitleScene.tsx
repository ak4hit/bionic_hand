import React from "react";
import { Audio, staticFile } from "remotion";
import { AnimatedHeading } from "../components/AnimatedText";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { ImageCard } from "../components/ImageCard";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const TitleScene: React.FC<SceneProps> = ({
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
        padding: "100px 100px 130px 100px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 80,
      }}
    >
      <Audio src={staticFile("voice/scene1.mp3")} />
      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Left Column: Title and details */}
      <div
        style={{
          flex: 1.15,
          display: "flex",
          flexDirection: "column",
          gap: 28,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Chip
            label="RESEARCH PLATFORM"
            sublabel="Open Source & Fully Modifiable"
            delay={3}
            highlight
          />
        </div>

        <AnimatedHeading
          title="HANDi Hand"
          subtitle="A 3D-printed, open-source robotic hand for machine learning and prosthetics research."
          credit="Designed at the BLINC Lab, University of Alberta"
          delay={5}
          showUnderline
        />

        <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
          <Chip label="163g PLA" sublabel="Fully 3D-Printed" delay={18} />
          <Chip label="6 Servos" sublabel="Hitec HS-35HD" delay={23} />
          <Chip label="Tendon-Driven" sublabel="Zip-Tie Routing" delay={28} />
        </div>
      </div>

      {/* Right Column: Hero Image Card */}
      <div
        style={{
          flex: 0.95,
          height: 620,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <ImageCard
          src="images/hero_both_hands.png"
          alt="HANDi Hand Pair"
          badge="Complete Assembly"
          delay={8}
          enableKenBurns
          height={620}
        />
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
