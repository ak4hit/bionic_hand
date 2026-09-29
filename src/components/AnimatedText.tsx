import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface AnimatedHeadingProps {
  title: string;
  subtitle?: string;
  credit?: string;
  delay?: number;
  showUnderline?: boolean;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  title,
  subtitle,
  credit,
  delay = 0,
  showUnderline = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const subtitleProgress = spring({
    frame: frame - delay - 8,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const creditProgress = spring({
    frame: frame - delay - 14,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const underlineWidth = interpolate(
    spring({
      frame: frame - delay - 4,
      fps,
      config: { damping: 16, stiffness: 90 },
    }),
    [0, 1],
    [0, 160]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 76,
            fontWeight: 800,
            color: COLORS.textPrimary,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 40}px)`,
          }}
        >
          {title}
        </h1>
        {showUnderline && (
          <div
            style={{
              height: 6,
              borderRadius: 3,
              backgroundColor: COLORS.accentOrange,
              width: underlineWidth,
              marginTop: 12,
              boxShadow: `0 2px 10px rgba(242, 140, 40, 0.4)`,
            }}
          />
        )}
      </div>

      {subtitle && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26,
            fontWeight: 500,
            color: COLORS.textSecondary,
            lineHeight: 1.45,
            maxWidth: 820,
            margin: 0,
            opacity: subtitleProgress,
            transform: `translateY(${(1 - subtitleProgress) * 30}px)`,
          }}
        >
          {subtitle}
        </p>
      )}

      {credit && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            marginTop: 8,
            opacity: creditProgress,
            transform: `translateY(${(1 - creditProgress) * 20}px)`,
          }}
        >
          <div
            style={{
              width: 24,
              height: 2,
              backgroundColor: COLORS.accentBlue,
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: COLORS.accentBlue,
              letterSpacing: "0.02em",
            }}
          >
            {credit}
          </span>
        </div>
      )}
    </div>
  );
};
