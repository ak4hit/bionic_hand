import React from "react";
import { Audio, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const OutroScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const cardProgress = spring({
    frame: frame - 12,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  const creditProgress = spring({
    frame: frame - 24,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 100px 150px 100px",
      }}
    >
      <Audio src={staticFile("voice/scene8.mp3")} />

      {/* Dimmed Background CAD Video */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          opacity: 0.20,
          filter: "grayscale(25%) contrast(110%)",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <OffthreadVideo
          src={staticFile("handi_freecad.mp4")}
          startFrom={14 * 30}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Soft Gradient Overlay for text contrast */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1920,
          height: 1080,
          background:
            "radial-gradient(ellipse at center, rgba(245, 246, 248, 0.88) 30%, rgba(245, 246, 248, 0.96) 80%)",
          zIndex: 1,
        }}
      />

      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Foreground Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 1200,
          gap: 22,
          marginTop: -20,
        }}
      >
        <div
          style={{
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 30}px)`,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 18px",
              borderRadius: 9999,
              backgroundColor: COLORS.accentOrangeLight,
              border: `1px solid ${COLORS.accentOrange}`,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.accentOrange,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Open-Source Robotics
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 68,
              fontWeight: 800,
              color: COLORS.textPrimary,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            HANDi Hand
          </h1>
        </div>

        {/* Highlight Card */}
        <div
          style={{
            padding: "20px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(12px)",
            borderRadius: 22,
            border: `2px solid ${COLORS.accentOrange}`,
            boxShadow: COLORS.cardShadowHover,
            opacity: cardProgress,
            transform: `scale(${0.92 + 0.08 * cardProgress})`,
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.textPrimary,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Open source. About 30 hours to build. Fully modifiable.
          </p>
        </div>

        {/* Quick Specs Chips */}
        <div
          style={{
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
            justifyContent: "center",
            opacity: cardProgress,
          }}
        >
          <Chip label="163g PLA" sublabel="Printed weight" delay={15} />
          <Chip label="~30 Hours" sublabel="Assembly time" delay={20} highlight />
          <Chip label="6 HS-35HD Servos" sublabel="Actuation" delay={25} />
          <Chip label="9 Pots + 5 FSRs" sublabel="Sensor array" delay={30} />
          <Chip label="Palm USB Camera" sublabel="Egocentric vision" delay={35} />
        </div>

        {/* Credit Banner */}
        <div
          style={{
            marginTop: 6,
            padding: "14px 30px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: 14,
            border: `1px solid ${COLORS.cardBorder}`,
            opacity: creditProgress,
            transform: `translateY(${(1 - creditProgress) * 15}px)`,
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: COLORS.textSecondary,
              margin: 0,
            }}
          >
            HANDi Hand by <strong style={{ color: COLORS.textPrimary }}>Dylan Brenneis</strong> and <strong style={{ color: COLORS.textPrimary }}>James Austin</strong>, BLINC Lab, University of Alberta. CAD overview created in FreeCAD.
          </p>
        </div>
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
