import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot13_AntennaBite: React.FC<{ progress: number }> = ({ progress }) => {
  const antennaRef = useRef<THREE.Mesh>(null);
  const teethRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!antennaRef.current || !teethRef.current) return;

    const bite = Math.sin(progress * Math.PI * 2);
    teethRef.current.position.y = THREE.MathUtils.lerp(-0.01, 0.005, (bite + 1) / 2);

    antennaRef.current.scale.y = THREE.MathUtils.lerp(1, 2.5, progress);
    antennaRef.current.material.transparent = true;
    antennaRef.current.material.opacity = THREE.MathUtils.lerp(1, 0.7, progress);
    antennaRef.current.material.color.setHSL(0.55, 1, 0.5);
  });

  return (
    <group>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh ref={antennaRef} position={[0, 0.02, 0.04]}>
        <cylinderGeometry args={[0.002, 0.002, 0.03, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={teethRef} position={[0, -0.01, 0.06]}>
        <boxGeometry args={[0.03, 0.01, 0.01]} />
        <meshStandardMaterial color="#FFF" roughness={0.3} />
      </mesh>
    </group>
  );
};