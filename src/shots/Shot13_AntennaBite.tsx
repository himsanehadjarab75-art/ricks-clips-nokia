import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot13_AntennaBite: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");

  const antennaRef = useRef<THREE.Mesh>(null);
  const teethRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!antennaRef.current || !teethRef.current) return;

    // Bite animation
    const bite = Math.sin(progress * Math.PI * 2);
    teethRef.current.position.y = THREE.MathUtils.lerp(-0.01, 0.005, (bite + 1) / 2);

    // Antenna extends with saliva
    antennaRef.current.scale.y = THREE.MathUtils.lerp(1, 2.5, progress);
    antennaRef.current.material.transparent = true;
    antennaRef.current.material.opacity = THREE.MathUtils.lerp(1, 0.7, progress);
    antennaRef.current.material.color.setHSL(0.55, 1, 0.5);
  });

  return (
    <group>
      <primitive object={nokia} scale={0.1} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh ref={antennaRef} name="antenna_nub" position={[0, 0.02, 0.04]}>
        <cylinderGeometry args={[0.002, 0.002, 0.03, 8]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={teethRef} name="teeth" position={[0, -0.01, 0.06]}>
        <boxGeometry args={[0.03, 0.01, 0.01]} />
        <meshStandardMaterial color="#FFF" roughness={0.3} />
      </mesh>
    </group>
  );
};