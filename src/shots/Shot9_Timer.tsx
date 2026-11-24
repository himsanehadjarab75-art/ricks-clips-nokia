import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot9_Timer: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");

  const thumbRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!thumbRef.current) return;

    // Thumb hover vibration
    thumbRef.current.position.z = Math.sin(progress * Math.PI * 20) * 0.001;
    thumbRef.current.rotation.x = Math.sin(progress * Math.PI * 20) * 0.02;
  });

  return (
    <group>
      <primitive object={nokia} scale={0.15} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh ref={thumbRef} name="frostbitten_thumb" position={[0, 0, 0.08]}>
        <coneGeometry args={[0.015, 0.04, 8]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Timer overlay */}
      <Html fullscreen>
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "72px",
            color: "#FF4500",
            textShadow: "0 0 16px #FF4500",
            opacity: progress,
          }}
        >
          {`00:00:${Math.max(0, 3 - Math.floor(progress * 3)).toString().padStart(2, "0")}`}
        </div>
      </Html>
    </group>
  );
};