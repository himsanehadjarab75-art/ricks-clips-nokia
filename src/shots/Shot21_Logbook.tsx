import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot21_Logbook: React.FC<{ progress: number }> = ({ progress }) => {
  const penRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!penRef.current) return;

    penRef.current.position.x = THREE.MathUtils.lerp(-0.05, 0.05, progress);
    penRef.current.rotation.z = Math.sin(progress * Math.PI * 10) * 0.1;
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh ref={penRef} position={[-0.05, -0.05, 0.1]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -0.1, 0.1]}>
        <boxGeometry args={[0.12, 0.01, 0.16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
    </group>
  );
};