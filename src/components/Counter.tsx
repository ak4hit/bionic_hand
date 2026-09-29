import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface CounterProps {
  value: number;
  label: string;
  sublabel?: string;
  delay?: number;
  accentColor?: string;
}

export const Counter: React.FC<CounterProps> = ({
  value,
  label,
  sublabel,
  delay = 0,
  accentColor = COLORS.accentOrange,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const countProgress = spring({
    frame: frame - delay - 6,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  const displayCount = Math.round(
    interpolate(countProgress, [0, 1], [0, value], {
      extrapolateRight: "clamp",
    })
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "24px 32px",
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: COLORS.cardShadow,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 25}px)`,
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 68,
          fontWeight: 800,
          color: accentColor,
          lineHeight: 1,
          minWidth: 70,
          textAlign: "center",
        }}
      >
        {displayCount}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: "-0.01em",
          }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: COLORS.textSecondary,
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
