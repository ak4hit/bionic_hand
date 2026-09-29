import React from "react";
import { Audio, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Captions } from "../components/Captions";
import { TopicChip } from "../components/TopicChip";
import { COLORS } from "../constants";
import { SceneProps } from "../types";

export const CadOverviewScene: React.FC<SceneProps> = ({
  topic,
  scene,
  text,
  words,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labels = [
    {
      title: "5 Digits",
      desc: "Fully articulated human-scale hand geometry",
      number: "01",
      delay: 15,
      color: COLORS.accentOrange,
    },
    {
      title: "6 Servo Motors",
      desc: "Hitec HS-35HD actuators with independent rotation",
      number: "02",
      delay: 45,
      color: COLORS.accentBlue,
    },
    {
      title: "Tendon-Driven Fingers",
      desc: "Durable zip-tie tendons wound on servo spools",
      number: "03",
      delay: 75,
      color: COLORS.accentBlue,
    },
    {
      title: "Every Part 3D Printable",
      desc: "Accessible PLA construction (~163g total mass)",
      number: "04",
      delay: 110,
      color: COLORS.accentOrange,
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
        gap: 50,
      }}
    >
      <Audio src={staticFile("voice/scene2.mp3")} />
      <TopicChip topic={topic} sceneNumber={scene} />

      {/* Left: FreeCAD CAD Video in Large Rounded Card */}
      <div
        style={{
          flex: 1.25,
          height: 640,
          position: "relative",
          borderRadius: 24,
          backgroundColor: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
          boxShadow: COLORS.cardShadow,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.90)",
            backdropFilter: "blur(8px)",
            borderRadius: 10,
            border: `1px solid ${COLORS.cardBorder}`,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#E53E3E",
              boxShadow: "0 0 8px #E53E3E",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              color: COLORS.textPrimary,
              letterSpacing: "0.08em",
            }}
          >
            FREECAD 3D MODEL
          </span>
        </div>

        <OffthreadVideo
          src={staticFile("handi_freecad.mp4")}
          startFrom={0}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      {/* Right: Side Panel of Animated Labels */}
      <div
        style={{
          flex: 0.95,
          display: "flex",
          flexDirection: "column",
          gap: 18,
          zIndex: 10,
        }}
      >
        <div style={{ marginBottom: 6 }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 38,
              fontWeight: 800,
              color: COLORS.textPrimary,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Complete CAD Assembly
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17,
              color: COLORS.textSecondary,
              margin: "6px 0 0 0",
            }}
          >
            Engineered for rapid prototyping & high repeatability
          </p>
        </div>

        {labels.map((item) => {
          const itemProgress = spring({
            frame: frame - item.delay,
            fps,
            config: { damping: 14, stiffness: 110 },
          });

          return (
            <div
              key={item.number}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: "16px 24px",
                backgroundColor: COLORS.cardBg,
                borderRadius: 18,
                border: `1px solid ${COLORS.cardBorder}`,
                boxShadow: "0 8px 24px rgba(27, 37, 64, 0.05)",
                opacity: itemProgress,
                transform: `translateX(${(1 - itemProgress) * 40}px)`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: COLORS.accentBlueLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  color: item.color,
                }}
              >
                {item.number}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 20,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: COLORS.textSecondary,
                    marginTop: 2,
                  }}
                >
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <Captions text={text} words={words} audioDuration={audioDuration} />
    </div>
  );
};
