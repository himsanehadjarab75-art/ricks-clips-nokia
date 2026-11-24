import { Html } from "@react-three/drei";

const shakeStyles = `
  @keyframes shake { 0% { transform: translateX(-2px); } 50% { transform: translateX(2px); } }
`;

export const Shot25_GoldstoneFail: React.FC<{ progress: number }> = ({ progress }) => {
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
        <div style={{ fontSize: "36px", color: "#888" }}>GOLDSTONE 70m — CRYOCOOLER STATUS</div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "72px",
            color: progress > 0.3 ? "#FF0000" : "#00FF00",
            fontWeight: "bold",
            textShadow: progress > 0.3 ? "0 0 32px #FF0000" : "0 0 32px #00FF00",
            animation: progress > 0.3 ? "shake 0.05s infinite" : "none",
          }}
        >
          {progress > 0.3 ? "RUPTURE" : "NOMINAL"}
        </div>
        <div style={{ marginTop: "20px", fontSize: "28px", color: "#FFD700" }}>
          400 kW: <span style={{ color: progress > 0.5 ? "#FF0000" : "#00FF00" }}>
            {progress > 0.5 ? "SILENT" : "ONLINE"}
          </span>
        </div>
        <div style={{ marginTop: "40px", fontSize: "32px", color: "#FF4500" }}>
          VARGAS STARES AT DEAD WATERFALL
        </div>
        <style dangerouslySetInnerHTML={{ __html: shakeStyles }} />
      </div>
    </Html>
  );
};