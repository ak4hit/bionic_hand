import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { WordTiming } from "../types";

interface CaptionsProps {
  text: string;
  words?: WordTiming[];
  audioDuration: number;
}

export const Captions: React.FC<CaptionsProps> = ({
  text,
  words: rawWords,
  audioDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Align raw edge-tts words with original text tokens to preserve punctuation
  const timedWords: WordTiming[] = useMemo(() => {
    const rawTextTokens = text.trim().split(/\s+/);

    if (rawWords && rawWords.length > 0) {
      return rawWords.map((w, idx) => {
        const matchingToken = rawTextTokens[idx];
        const displayText = matchingToken || w.text;
        return {
          text: displayText,
          start: w.start,
          end: w.end,
          duration: w.duration,
        };
      });
    }

    // Fallback: split text and distribute evenly
    const effectiveDuration = audioDuration > 0 ? audioDuration : 6;
    const wordDuration = effectiveDuration / Math.max(1, rawTextTokens.length);

    return rawTextTokens.map((token, index) => ({
      text: token,
      start: index * wordDuration,
      end: (index + 1) * wordDuration,
      duration: wordDuration,
    }));
  }, [rawWords, text, audioDuration]);

  // Group into natural, readable clauses based on punctuation and length
  const phrases = useMemo(() => {
    if (timedWords.length === 0) return [];

    const groups: WordTiming[][] = [];
    let currentGroup: WordTiming[] = [];

    timedWords.forEach((word) => {
      currentGroup.push(word);

      // Check if word ends with terminal punctuation (. ! ?)
      const isSentenceEnd = /[.!?]$/.test(word.text);
      // Check if word ends with clause punctuation (, ; :)
      const isClauseEnd = /[,;:]$/.test(word.text);

      if (
        (isSentenceEnd && currentGroup.length >= 3) ||
        (isClauseEnd && currentGroup.length >= 4) ||
        currentGroup.length >= 8
      ) {
        groups.push(currentGroup);
        currentGroup = [];
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }, [timedWords]);

  // Determine active phrase
  const activePhraseIndex = useMemo(() => {
    if (phrases.length === 0) return 0;

    for (let i = 0; i < phrases.length; i++) {
      const phrase = phrases[i];
      const start = phrase[0].start;
      const end = phrase[phrase.length - 1].end;

      if (currentTime >= start && currentTime <= end) {
        return i;
      }
      if (currentTime < start && i === 0) {
        return 0;
      }
    }

    // If past all phrases, show last phrase
    const lastPhrase = phrases[phrases.length - 1];
    if (currentTime > lastPhrase[lastPhrase.length - 1].end) {
      return phrases.length - 1;
    }

    // Fallback to nearest
    let closestIndex = 0;
    let minDiff = Infinity;
    phrases.forEach((phrase, idx) => {
      const mid = (phrase[0].start + phrase[phrase.length - 1].end) / 2;
      const diff = Math.abs(currentTime - mid);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    return closestIndex;
  }, [phrases, currentTime]);

  const activePhrase = phrases[activePhraseIndex] || timedWords;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 200,
        pointerEvents: "none",
        padding: "0 60px",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px 16px",
          background: "rgba(23, 31, 54, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          padding: "16px 36px",
          borderRadius: 24,
          border: "1px solid rgba(255, 255, 255, 0.16)",
          boxShadow: "0 16px 40px rgba(10, 15, 30, 0.35)",
          maxWidth: 1550,
        }}
      >
        {activePhrase.map((wordObj, i) => {
          const isCurrent =
            currentTime >= wordObj.start - 0.05 &&
            currentTime <= wordObj.end + 0.05;
          const isPast = currentTime > wordObj.end + 0.05;

          return (
            <span
              key={`${activePhraseIndex}-${i}-${wordObj.text}`}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 42,
                fontWeight: isCurrent ? 700 : 500,
                color: isCurrent
                  ? COLORS.accentOrange
                  : isPast
                  ? "#FFFFFF"
                  : "rgba(255, 255, 255, 0.65)",
                transform: isCurrent ? "scale(1.05)" : "scale(1)",
                transition: "color 0.1s ease, transform 0.1s ease",
                display: "inline-block",
                letterSpacing: "-0.01em",
                textShadow: isCurrent
                  ? `0 0 16px rgba(242, 140, 40, 0.5)`
                  : "none",
              }}
            >
              {wordObj.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};
