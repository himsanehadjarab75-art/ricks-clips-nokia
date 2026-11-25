import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot30_CallEnded: React.FC<{ progress: number }> = ({ progress }) => {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    screenRef.current.material.color.setHSL(0.55, 1, 0.5);
    screenRef.current.material.opacity = progress;
  });

  return (
    <group>
      <mesh ref={screenRef} position={[0, 0, 0]}>
        <planeGeometry args={[0.04, 0.03]} />
        <meshStandardMaterial color="#00FFFF" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};