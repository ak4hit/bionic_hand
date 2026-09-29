import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface ChipProps {
  label: string;
  sublabel?: string;
  delay?: number;
  highlight?: boolean;
  accentColor?: string;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  sublabel,
  delay = 0,
  highlight = false,
  accentColor = COLORS.accentBlue,
  icon,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: sublabel ? "12px 20px" : "10px 18px",
        borderRadius: 14,
        backgroundColor: highlight ? COLORS.accentOrangeLight : COLORS.cardBg,
        border: `1.5px solid ${
          highlight ? COLORS.accentOrange : COLORS.cardBorder
        }`,
        boxShadow: "0 4px 12px rgba(27, 37, 64, 0.05)",
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 20}px) scale(${0.9 + 0.1 * entrance})`,
      }}
    >
      {icon ? (
        <div style={{ display: "flex", alignItems: "center" }}>{icon}</div>
      ) : (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: highlight ? COLORS.accentOrange : accentColor,
          }}
        />
      )}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: highlight ? COLORS.accentOrange : COLORS.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: COLORS.textMuted,
              marginTop: 2,
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
