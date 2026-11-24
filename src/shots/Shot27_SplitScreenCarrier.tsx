import { Html } from "@react-three/drei";

const flatlineStyles = `
  @keyframes flatline { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.2; } }
`;

export const Shot27_SplitScreenCarrier: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <div style={{ flex: 1, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #FF0000" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", color: "#888" }}>GOLDSTONE</div>
            <div style={{ fontSize: "56px", color: "#FF0000", animation: "flatline 0.3s infinite" }}>FLATLINE</div>
            <div style={{ fontSize: "20px", color: "#FF0000" }}>−∞ dB</div>
          </div>
        </div>
        <div style={{ flex: 1, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", color: "#888" }}>CODER'S DISH</div>
            <div style={{ fontSize: "56px", color: "#00FF00", textShadow: "0 0 16px #00FF00" }}>CARRIER LOCK</div>
            <div style={{ fontSize: "20px", color: "#00FFFF" }}>SNR: -9.0 dB • DATA FLOWING</div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: flatlineStyles }} />
      </div>
    </Html>
  );
};