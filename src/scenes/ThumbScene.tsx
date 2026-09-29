import React from "react";
import { Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { ImageCard } from "../components/ImageCard";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const ThumbScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const grips = [
    { name: "Pinch Grip", desc: "Two-finger precision", delay: 18 },
    { name: "Tripod Grip", desc: "Three-point hold", delay: 32 },
    { name: "Column Grip", desc: "Power cylindrical grasp", delay: 46 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: 1920,
        height: 1080,
        backgroundColor: COLORS.bg,
        overflow: "hidden",
        padding: "80px 90px 140px 90px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 60,
      }}
    >
      <Audio src={staticFile("voice/scene4.mp3")} />

      {/* Left: Exploded Thumb Visual */}
      <div
        style={{
          flex: 1.1,
          height: 600,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageCard
          src="images/thumb_exploded.png"
          alt="Exploded Thumb Mechanism"
          badge="Thumb Rotator & Gears"
          delay={5}
          enableKenBurns
          height={600}
        />
      </div>

      {/* Right: Kinematics & Grip Modes */}
      <div
        style={{
          flex: 1.0,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 10,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <Chip label="INDEPENDENT ROTATOR" delay={3} highlight />
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
            Geared Opposable Thumb
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: COLORS.textSecondary,
              margin: "8px 0 0 0",
              lineHeight: 1.45,
            }}
          >
            Equipped with a dedicated servo and geared rotator mechanism to swing across the palm for diverse grasping modes.
          </p>
        </div>

        {/* Feature Specs */}
        <div style={{ display: "flex", gap: 14 }}>
          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              backgroundColor: COLORS.cardBg,
              borderRadius: 16,
              border: `1px solid ${COLORS.cardBorder}`,
              boxShadow: "0 6px 18px rgba(27, 37, 64, 0.05)",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.accentBlue,
                display: "block",
              }}
            >
              Independent Servo
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: COLORS.textSecondary,
                marginTop: 2,
                display: "block",
              }}
            >
              Dedicated 6th actuator
            </span>
          </div>

          <div
            style={{
              flex: 1,
              padding: "16px 20px",
              backgroundColor: COLORS.cardBg,
              borderRadius: 16,
              border: `1px solid ${COLORS.cardBorder}`,
              boxShadow: "0 6px 18px rgba(27, 37, 64, 0.05)",
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.accentBlue,
                display: "block",
              }}
            >
              Geared Rotator
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: COLORS.textSecondary,
                marginTop: 2,
                display: "block",
              }}
            >
              Full transverse palm swing
            </span>
          </div>
        </div>

        {/* Highlight Grip Row (Horizontal) */}
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textMuted,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Primary Grasp Modes:
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
            {grips.map((grip) => {
              const gripProgress = spring({
                frame: frame - grip.delay,
                fps,
                config: { damping: 14, stiffness: 120 },
              });

              return (
                <div
                  key={grip.name}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "14px 16px",
                    backgroundColor: COLORS.cardBg,
                    borderRadius: 14,
                    border: `1.5px solid ${COLORS.accentOrange}`,
                    boxShadow: "0 4px 14px rgba(242, 140, 40, 0.10)",
                    opacity: gripProgress,
                    transform: `translateY(${(1 - gripProgress) * 15}px)`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                    }}
                  >
                    {grip.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      color: COLORS.accentOrange,
                      marginTop: 2,
                    }}
                  >
                    {grip.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
