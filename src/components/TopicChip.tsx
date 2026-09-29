import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface TopicChipProps {
  topic: string;
  sceneNumber: number;
}

export const TopicChip: React.FC<TopicChipProps> = ({ topic, sceneNumber }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 120,
      mass: 0.8,
    },
  });

  const opacity = Math.min(1, progress);
  const translateX = (1 - progress) * -30;

  return (
    <div
      style={{
        position: "absolute",
        top: 50,
        left: 80,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 18px",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: 9999,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: "0 4px 16px rgba(27, 37, 64, 0.06)",
        opacity,
        transform: `translateX(${translateX}px)`,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: COLORS.accentOrange,
          boxShadow: `0 0 10px ${COLORS.accentOrange}`,
        }}
      />
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: COLORS.accentBlue,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        0{sceneNumber} / {topic}
      </span>
    </div>
  );
};
