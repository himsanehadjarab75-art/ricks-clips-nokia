import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot11_Armpit: React.FC<{ progress: number }> = ({ progress }) => {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    const fade = progress < 0.4 ? progress * 2.5 : 1 - (progress - 0.4) * 1.67;
    screenRef.current.material.opacity = THREE.MathUtils.clamp(fade, 0.1, 1);
    screenRef.current.material.color.setHSL(0.3, 1, 0.5 * fade);
  });

  return (
    <group>
      {/* Jacket */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.4]} />
        <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshBasicMaterial color="#00FF00" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};