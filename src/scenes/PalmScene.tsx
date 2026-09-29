import React from "react";
import { Audio, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { Chip } from "../components/Chip";
import { ImageCard } from "../components/ImageCard";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const PalmScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chips = [
    {
      title: "Palm-Mounted Camera",
      desc: "Egocentric USB webcam streams real-time visual observations for ML models",
      badge: "Vision",
      delay: 20,
      highlight: true,
    },
    {
      title: "Neoprene Grip Pads",
      desc: "High-friction rubber pads absorb impact and prevent slipping during grasping",
      badge: "Friction",
      delay: 45,
      highlight: false,
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
        padding: "65px 90px 140px 90px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 24,
      }}
    >
      <Audio src={staticFile("voice/scene7.mp3")} />

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
            <Chip label="EMBEDDED VISION" delay={2} highlight />
            <Chip label="TACTILE CONTACT" delay={8} />
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
            Egocentric Vision & Contact Damping
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15,
            color: COLORS.textSecondary,
            maxWidth: 500,
            textAlign: "right",
            margin: 0,
          }}
        >
          Integrated palm webcam allows visual servoing while neoprene pads enhance tactile friction
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
            src="images/webcam_palm.png"
            alt="Palm Mounted Webcam"
            badge="Palm-Mounted Camera"
            delay={10}
            enableKenBurns
            height={300}
          />
        </div>

        <div style={{ flex: 1, height: "100%" }}>
          <ImageCard
            src="images/palm_grips_camera.png"
            alt="Palm Gripping Camera"
            badge="Neoprene Grip Pads"
            delay={20}
            enableKenBurns
            height={300}
          />
        </div>
      </div>

      {/* Bottom: Feature Cards */}
      <div
        style={{
          display: "flex",
          gap: 32,
          width: "100%",
        }}
      >
        {chips.map((item) => {
          const entrance = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 14, stiffness: 110 },
          });

          return (
            <div
              key={item.title}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 24px",
                backgroundColor: COLORS.cardBg,
                borderRadius: 18,
                border: `1.5px solid ${
                  item.highlight ? COLORS.accentOrange : COLORS.cardBorder
                }`,
                boxShadow: COLORS.cardShadow,
                opacity: entrance,
                transform: `translateY(${(1 - entrance) * 20}px)`,
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
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    marginTop: 3,
                    maxWidth: 480,
                  }}
                >
                  {item.desc}
                </span>
              </div>
              <div
                style={{
                  padding: "6px 14px",
                  borderRadius: 10,
                  backgroundColor: item.highlight
                    ? COLORS.accentOrangeLight
                    : COLORS.accentBlueLight,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: item.highlight ? COLORS.accentOrange : COLORS.accentBlue,
                }}
              >
                {item.badge}
              </div>
            </div>
          );
        })}
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
