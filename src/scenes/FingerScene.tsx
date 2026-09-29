import React from "react";
import { Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { ImageCard } from "../components/ImageCard";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const FingerScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sections = [
    { name: "Distal Section", tag: "Fingertip", detail: "Houses force sensor and tactile pad", delay: 10 },
    { name: "Intermediate Section", tag: "Mid-Joint", detail: "Provides anatomical flexion curvature", delay: 28 },
    { name: "Proximal Section", tag: "Base", detail: "Connects to metacarpal knuckle mount", delay: 46 },
    { name: "M2 Screw Hinges", tag: "Fasteners", detail: "Smooth pivot pins joining all segments", delay: 64, highlight: true },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        padding: "100px 90px 130px 90px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
      }}
    >
      <Audio src={staticFile("voice/scene3.mp3")} />
      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Left: Exploded Finger Card */}
      <div
        style={{
          flex: 1.15,
          height: 640,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageCard
          src="images/finger_exploded.png"
          alt="Exploded Finger Assembly"
          badge="Exploded Finger Assembly"
          delay={5}
          enableKenBurns
          height={640}
        />
      </div>

      {/* Right: Technical Section Details */}
      <div
        style={{
          flex: 0.95,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: 4 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <Chip label="FINGER ARCHITECTURE" delay={2} highlight />
          </div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 38,
              fontWeight: 800,
              color: COLORS.textPrimary,
              margin: 0,
            }}
          >
            Segmented Modular Digits
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: COLORS.textSecondary,
              margin: "6px 0 0 0",
            }}
          >
            Joined by low-friction pivot hinges and held by M2 screws
          </p>
        </div>

        {sections.map((item) => {
          const itemProgress = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 14, stiffness: 110 },
          });

          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                backgroundColor: COLORS.cardBg,
                borderRadius: 18,
                border: `1.5px solid ${
                  item.highlight ? COLORS.accentOrange : COLORS.cardBorder
                }`,
                boxShadow: "0 6px 20px rgba(27, 37, 64, 0.05)",
                opacity: itemProgress,
                transform: `translateX(${(1 - itemProgress) * 35}px)`,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: item.highlight ? COLORS.accentOrange : COLORS.textPrimary,
                  }}
                >
                  {item.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    marginTop: 2,
                  }}
                >
                  {item.detail}
                </span>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  backgroundColor: item.highlight
                    ? COLORS.accentOrangeLight
                    : COLORS.accentBlueLight,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: item.highlight ? COLORS.accentOrange : COLORS.accentBlue,
                }}
              >
                {item.tag}
              </div>
            </div>
          );
        })}
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
