import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";

interface ImageCardProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  badge?: string;
  badgeColor?: string;
  enableKenBurns?: boolean;
  delay?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt = "HANDi Component",
  width = "100%",
  height = "100%",
  badge,
  badgeColor = COLORS.accentBlue,
  enableKenBurns = true,
  delay = 0,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const cardEntrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const kenBurnsScale = enableKenBurns
    ? interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        borderRadius: 24,
        backgroundColor: COLORS.cardBg,
        border: `1px solid ${COLORS.cardBorder}`,
        boxShadow: COLORS.cardShadow,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: cardEntrance,
        transform: `scale(${interpolate(cardEntrance, [0, 1], [0.94, 1])})`,
        ...style,
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 24,
            zIndex: 10,
            padding: "6px 14px",
            backgroundColor: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            borderRadius: 8,
            border: `1px solid ${COLORS.cardBorder}`,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: badgeColor,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {badge}
        </div>
      )}

      {src ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
            transform: `scale(${kenBurnsScale})`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile(src)}
            alt={alt}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      ) : (
        children
      )}
    </div>
  );
};
