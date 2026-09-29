import React from "react";
import { Audio, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const ActuationScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const crossFadeStart = Math.floor(durationInFrames * 0.45);
  const crossFadeLength = 24;

  const fadeProgress = interpolate(
    frame,
    [crossFadeStart, crossFadeStart + crossFadeLength],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const kenBurnsScale = interpolate(
    frame,
    [0, durationInFrames],
    [1.0, 1.07],
    { extrapolateRight: "clamp" }
  );

  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const chips = [
    {
      label: "Zip-Tie Tendons",
      sublabel: "Low-friction, high-tensile flexible tendons wound on spools",
      delay: 15,
      highlight: true,
    },
    {
      label: "Hitec HS-35HD Servos",
      sublabel: "6 precision micro actuators providing independent joint drive",
      delay: 38,
      highlight: false,
    },
    {
      label: "Aluminium Heat-Sink Covers",
      sublabel: "Passive thermal management prevents motor overheating",
      delay: 62,
      highlight: true,
    },
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
      <Audio src={staticFile("voice/scene5.mp3")} />
      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Left: Cross-fading Image Card */}
      <div
        style={{
          flex: 1.15,
          height: 640,
          position: "relative",
          borderRadius: 24,
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          boxShadow: COLORS.cardShadow,
          overflow: "hidden",
          opacity: cardEntrance,
          transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
        }}
      >
        {/* Dynamic Badge */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            zIndex: 20,
            padding: "8px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            borderRadius: 10,
            border: `1px solid ${COLORS.cardBorder}`,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: COLORS.accentBlue,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {fadeProgress > 0.5 ? "Actuation Assembly" : "Servo Spool & Tendon"}
        </div>

        {/* First Image: servo_spool.png */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            opacity: 1 - fadeProgress,
            transform: `scale(${kenBurnsScale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/servo_spool.png")}
            alt="Servo Spool"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Second Image: hero_both_hands.png */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
            opacity: fadeProgress,
            transform: `scale(${kenBurnsScale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("images/hero_both_hands.png")}
            alt="Both Hands Actuation Assembly"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      {/* Right: Powertrain details & Chips */}
      <div
        style={{
          flex: 0.95,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 10,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <Chip label="POWERTRAIN & THERMALS" delay={2} highlight />
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
            Tendon Spool Drive
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 16,
              color: COLORS.textSecondary,
              margin: "6px 0 0 0",
              lineHeight: 1.45,
            }}
          >
            Zip-tie tendons wound directly onto custom servo spools deliver direct, compliant tensile force.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {chips.map((item) => {
            const entrance = spring({
              frame: frame - item.delay,
              fps,
              config: { damping: 14, stiffness: 110 },
            });

            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  padding: "18px 24px",
                  backgroundColor: COLORS.cardBg,
                  borderRadius: 18,
                  border: `1.5px solid ${
                    item.highlight ? COLORS.accentOrange : COLORS.cardBorder
                  }`,
                  boxShadow: "0 6px 20px rgba(27, 37, 64, 0.05)",
                  opacity: entrance,
                  transform: `translateX(${(1 - entrance) * 35}px)`,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: item.highlight ? COLORS.accentOrange : COLORS.accentBlue,
                    flexShrink: 0,
                  }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: item.highlight ? COLORS.accentOrange : COLORS.textPrimary,
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: COLORS.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    {item.sublabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
