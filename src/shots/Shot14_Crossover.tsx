import { Html } from "@react-three/drei";

const flashStyles = `
  @keyframes flash { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
`;

export const Shot14_Crossover: React.FC<{ progress: number }> = ({ progress }) => {
  const crossed = progress > 0.5;

  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #FF4500" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", color: "#888" }}>GOLDSTONE</div>
            <div style={{ fontSize: "64px", color: "#FF0000" }}>-11.0 dB</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", color: "#888" }}>CODER'S DISH</div>
            <div style={{ fontSize: "64px", color: crossed ? "#00FF00" : "#FFD700", transition: "color 0.05s" }}>
              {crossed ? "-10.0 dB" : "-14.0 dB"}
            </div>
          </div>
        </div>
        {crossed && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "48px",
              color: "#00FFFF",
              textShadow: "0 0 32px #00FFFF",
              animation: "flash 0.1s infinite",
            }}
          >
            CROSSOVER
          </div>
        )}
        <style dangerouslySetInnerHTML={{ __html: flashStyles }} />
      </div>
    </Html>
  );
};