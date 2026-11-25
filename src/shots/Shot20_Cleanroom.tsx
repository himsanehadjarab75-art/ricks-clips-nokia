import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot20_Cleanroom: React.FC<{ progress: number }> = ({ progress }) => {
  const tagRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!tagRef.current) return;

    tagRef.current.position.z = THREE.MathUtils.lerp(-0.05, 0, progress);
    tagRef.current.material.opacity = progress;
  });

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh ref={tagRef} position={[0.04, 0.02, 0]}>
        <planeGeometry args={[0.03, 0.015]} />
        <meshBasicMaterial color="#FFF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.1, 0, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.12]} />
        <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};