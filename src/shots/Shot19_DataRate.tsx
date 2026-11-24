import { Html } from "@react-three/drei";

export const Shot19_DataRate: React.FC<{ progress: number }> = ({ progress }) => {
  const rate = Math.floor(160 + progress * 1240); // 160 to 1400 bps

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
        }}
      >
        <div style={{ fontSize: "48px", color: "#888" }}>VOYAGER TELEMETRY</div>
        <div style={{ fontSize: "120px", color: "#00FFFF", fontWeight: "bold", textShadow: "0 0 32px #00FFFF" }}>
          {rate} bps
        </div>
        <div style={{ marginTop: "40px", fontSize: "36px", color: "#FFD700" }}>
          GOLDEN RECORD SPINNING
        </div>
        <svg width="200" height="200" style={{ marginTop: "40px", animation: "spin 2s linear infinite" }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="#FFD700" strokeWidth="4" strokeDasharray="20 10" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#00FFFF" strokeWidth="2" strokeDasharray="10 20" />
          <style jsx>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </svg>
      </div>
    </Html>
  );
};