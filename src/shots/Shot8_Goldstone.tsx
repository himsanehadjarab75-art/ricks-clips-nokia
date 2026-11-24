import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot8_Goldstone: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: goldstone } = useGLTF("/assets/models/goldstone_dish.glb");
  const { scene: vargas } = useGLTF("/assets/models/vargas_rig.glb");

  useFrame(() => {
    if (goldstone) {
      // Goldstone slewing
      goldstone.rotation.y = progress * 0.03;
    }
  });

  return (
    <group>
      <primitive object={goldstone} scale={2} position={[0, 0, -15]} />
      <primitive object={vargas} scale={1} position={[0, 3, 5]} />
      {/* 400kW transformer hum visual */}
      <mesh position={[0, 2, -10]}>
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial
          color="#222"
          metalness={0.8}
          roughness={0.2}
          emissive="#333"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
};