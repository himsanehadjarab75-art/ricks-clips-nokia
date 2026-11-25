import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

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
    <group>
      {frames.slice(0, visibleFrames).map((frame, i) => (
        <mesh
          key={i}
          position={[0, i * 0.12 - 0.3, 0]}
        >
          <boxGeometry args={[0.6, 0.08, 0.02]} />
          <meshStandardMaterial
            color="#00FF00"
            emissive="#00FF00"
            emissiveIntensity={i < visibleFrames - 1 ? 0.5 : 1}
            transparent
            opacity={1}
          />
        </mesh>
      ))}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.02]} />
        <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};