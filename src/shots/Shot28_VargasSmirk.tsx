import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot28_VargasSmirk: React.FC<{ progress: number }> = ({ progress }) => {
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mouthRef.current) return;

    mouthRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.15, progress);
    mouthRef.current.scale.x = THREE.MathUtils.lerp(1, 1.3, progress);
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh ref={mouthRef} position={[0, -0.03, 0.08]}>
        <boxGeometry args={[0.04, 0.01, 0.005]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
    </group>
  );
};