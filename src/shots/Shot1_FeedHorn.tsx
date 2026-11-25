import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot1_FeedHorn: React.FC<{ progress: number }> = ({ progress }) => {
  const groupRef = useRef<THREE.Group>(null);
  const handRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!groupRef.current || !handRef.current) return;

    const insertProgress = Math.min(progress * 2, 1);
    handRef.current.position.z = THREE.MathUtils.lerp(0.2, -0.02, insertProgress);
  });

  return (
    <group ref={groupRef}>
      {/* Dish */}
      <mesh>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* Gloved hand */}
      <mesh ref={handRef} position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Nokia phone */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
};