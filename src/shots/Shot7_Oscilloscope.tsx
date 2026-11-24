import { Html } from "@react-three/drei";
import { useRef } from "react";

const lockStyles = `
  @keyframes lock { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0.3; } }
`;

export const Shot7_Oscilloscope: React.FC<{ progress: number }> = ({ progress }) => {
  const lockRef = useRef<number>(0);
  const framesRef = useRef<number>(0);

  return (
    <Html fullscreen>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        {/* Oscilloscope grid */}
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#003300" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Waveform */}
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <path
            d={`M 0 ${960} ${Array.from({ length: 1080 }, (_, x) => {
              const t = (x / 1080) * Math.PI * 8 + progress * Math.PI * 4;
              const gsm = Math.sin(t * 217/60) * 0.3; // 217 Hz TDMA
              const harmonic = Math.sin(t * 8) * 0.2; // 8th harmonic
              const y = 960 - (gsm + harmonic) * 300;
              return `${x} ${y}`;
            }).join(" ")}`}
            fill="none"
            stroke="#00FF00"
            strokeWidth="2"
            filter="url(#glow)"
            style={{ opacity: progress }}
          />
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        {/* Labels */}
        <div style={{ position: "absolute", top: "5%", left: "5%", color: "#00FF00", fontSize: "20px" }}>
          CH1: GSM 217 Hz TDMA  •  CH2: 8th HARMONIC → 8.4 GHz
        </div>
        <div style={{ position: "absolute", top: "5%", right: "5%", color: "#FFD700", fontSize: "20px", textAlign: "right" }}>
          LOCK: <span style={{ animation: "lock 1s infinite" }}>{progress > 0.6 ? "ACQUIRED" : "SEARCHING"}</span>
        </div>
        <div style={{ position: "absolute", bottom: "5%", left: "5%", color: "#FF4500", fontSize: "18px" }}>
          MATH WORKS. PHYSICS? PRAYING.
        </div>
        <style dangerouslySetInnerHTML={{ __html: lockStyles }} />
      </div>
    </Html>
  );
};