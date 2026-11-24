import { Html } from "@react-three/drei";

export const Shot12_SNRGap: React.FC<{ progress: number }> = ({ progress }) => {
  const goldstoneSNR = -12;
  const coderSNR = -14 + progress * 4; // -14 to -10

  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid #FF4500" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#888" }}>GOLDSTONE 70m</div>
            <div style={{ fontSize: "72px", color: "#FF0000", fontWeight: "bold" }}>{goldstoneSNR} dB</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "32px", color: "#888" }}>CODER'S DISH</div>
            <div style={{ fontSize: "72px", color: coderSNR > goldstoneSNR ? "#00FF00" : "#FFD700", fontWeight: "bold", transition: "color 0.1s" }}>
              {coderSNR.toFixed(1)} dB
            </div>
            <div style={{ fontSize: "20px", color: "#FF4500", marginTop: "8px" }}>
              GAP: {Math.abs(coderSNR - goldstoneSNR).toFixed(1)} dB
            </div>
          </div>
        </div>
        <div style={{ height: "10%", display: "flex", alignItems: "center", justifyContent: "center", color: "#FF4500", fontSize: "24px" }}>
          FOREHEAD VEINS DISAGREED
        </div>
      </div>
    </Html>
  );
};