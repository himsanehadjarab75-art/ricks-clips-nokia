import { interpolate } from "remotion";
import { Shot } from "../data/shots";

interface VOOverlayProps {
  shot: Shot;
  progress: number;
}

export const VOOverlay: React.FC<VOOverlayProps> = ({ shot, progress }) => {
  // Voiceover timing: starts at 10% of shot, ends at 90%
  const voStart = 0.1;
  const voEnd = 0.9;
  const voProgress = interpolate(progress, [voStart, voEnd], [0, 1], { clamp: true });

  if (voProgress <= 0) return null;

  // Typewriter effect for that breathless Ricks Clips feel
  const charsToShow = Math.floor(shot.vo.length * voProgress);
  const displayText = shot.vo.slice(0, charsToShow);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "12%",
        left: "50%",
        transform: "translateX(-50%)",
        maxWidth: "90%",
        textAlign: "center",
        fontFamily: "'IBM Plex Mono', 'SF Mono', monospace",
        fontSize: "clamp(28px, 3.5vw, 42px)",
        lineHeight: 1.3,
        color: "#FFF",
        textShadow: "0 0 8px #000, 0 0 16px #000, 0 2px 4px rgba(0,0,0,0.8)",
        opacity: interpolate(progress, [voStart, voStart + 0.05, voEnd - 0.05, voEnd], [0, 1, 1, 0]),
        pointerEvents: "none",
        zIndex: 100,
        fontWeight: 500,
        letterSpacing: "0.02em",
      }}
    >
      {displayText}
      {voProgress < 1 && <span className="cursor" style={{ animation: "blink 0.8s infinite" }}>▌</span>}
      <style jsx>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        .cursor { margin-left: 2px; color: #FFD700; text-shadow: 0 0 8px #FFD700; }
      `}</style>
    </div>
  );
};