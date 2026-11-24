import { Html } from "@react-three/drei";

export const Shot4_SplitScreen: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* LEFT: Mission Control */}
        <div
          style={{
            flex: 1,
            background: "#0a0a0a",
            position: "relative",
            borderRight: "2px solid #FF4500",
            opacity: progress,
          }}
        >
          <div style={{ position: "absolute", top: "10%", left: "10%", color: "#FFF", fontFamily: "monospace", fontSize: "24px" }}>
            JPL MISSION CONTROL — FLIGHT DIRECTOR VARGAS
          </div>
          <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ fontSize: "48px", color: "#FF0000", fontWeight: "bold", fontFamily: "monospace" }}>
              DOWNLINK SNR: <span style={{ animation: "flatline 0.5s infinite" }}>−∞ dB</span>
            </div>
            <style jsx>{`
              @keyframes flatline { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
            `}</style>
          </div>
          <div style={{ position: "absolute", bottom: "10%", left: "10%", color: "#888", fontFamily: "monospace", fontSize: "18px" }}>
            GOLDSTONE  MADRID  CANBERRA  —  ALL LINKS DOWN
          </div>
        </div>

        {/* RIGHT: Coder at dish */}
        <div
          style={{
            flex: 1,
            background: "#0d0d0d",
            position: "relative",
            opacity: progress,
          }}
        >
          <div style={{ position: "absolute", top: "10%", left: "10%", color: "#FFF", fontFamily: "monospace", fontSize: "24px" }}>
            DISH VERTEX — CODER CAM
          </div>
          <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
            <div style={{ fontSize: "36px", color: "#00FFFF", fontFamily: "monospace" }}>
              AT+CSMS=1
            </div>
            <div style={{ fontSize: "20px", color: "#FFD700", marginTop: "8px", fontFamily: "monospace" }}>
              SENDING...
            </div>
          </div>
          <div style={{ position: "absolute", bottom: "10%", left: "10%", color: "#888", fontFamily: "monospace", fontSize: "16px" }}>
            BURGER WRAPPER CRINKLE • COLD • 3AM
          </div>
        </div>
      </div>
    </Html>
  );
};