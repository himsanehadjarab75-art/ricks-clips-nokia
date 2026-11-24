import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot21_Logbook: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: vargas } = useGLTF("/public/assets/models/vargas_rig.glb");

  const penRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!penRef.current) return;

    // Pen scratching
    penRef.current.position.x = THREE.MathUtils.lerp(-0.05, 0.05, progress);
    penRef.current.rotation.z = Math.sin(progress * Math.PI * 10) * 0.1;
  });

  return (
    <group>
      <primitive object={vargas} scale={1} position={[0, 0, 0]} />
      <mesh ref={penRef} name="pen" position={[-0.05, -0.05, 0.1]}>
        <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Logbook */}
      <mesh position={[0, -0.1, 0.1]}>
        <boxGeometry args={[0.12, 0.01, 0.16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
    </group>
  );
};