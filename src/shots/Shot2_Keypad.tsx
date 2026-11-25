import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot2_Keypad: React.FC<{ progress: number }> = ({ progress }) => {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    const pressCycle = Math.sin(progress * Math.PI * 4) * 0.5 + 0.5;
    screenRef.current.material.opacity = pressCycle;

    if (progress > 0.5 && progress < 0.7) {
      screenRef.current.material.emissiveIntensity = Math.sin((progress - 0.5) * 10) * 0.5;
    }
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.05]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 0.03]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};