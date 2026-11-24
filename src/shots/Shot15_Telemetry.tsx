import { Html } from "@react-three/drei";

const frames = [
  "FDS ACK       [OK]",
  "CMM READY     [OK]",
  "PLAYBACK INIT [OK]",
  "R-S DECODE    [OK]",
  "FRAME SYNC    [LOCKED]",
  "DATA RATE     1.4 kbps",
];

export const Shot15_Telemetry: React.FC<{ progress: number }> = ({ progress }) => {
  const visibleFrames = Math.floor(progress * frames.length);

  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "36px",
          lineHeight: 2,
          color: "#00FF00",
          textShadow: "0 0 8px #00FF00",
        }}
      >
        {frames.slice(0, visibleFrames).map((frame, i) => (
          <div
            key={i}
            style={{
              opacity: i < visibleFrames - 1 ? 1 : progress * frames.length - visibleFrames + 1,
              animation: i === visibleFrames - 1 ? "type 0.1s steps(20)" : "none",
            }}
          >
            {frame}
            <style jsx>{`@keyframes type { from { opacity: 0; } to { opacity: 1; } }`}</style>
          </div>
        ))}
        <div style={{ marginTop: "40px", color: "#FFD700", fontSize: "28px" }}>
          VOYAGER ANSWERED. 14 BILLION MILES.
        </div>
      </div>
    </Html>
  );
};