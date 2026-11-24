import { useFrame } from "@react-three/fiber";
import { useGLTF, group } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export const Shot24_PocketAnvil: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokiaNew } = useGLTF("/public/assets/models/nokia_3310_2017.glb");
  const { scene: nokiaOld } = useGLTF("/public/assets/models/nokia_3310.glb");

  useFrame(() => {
    // New phone slides into pocket
    nokiaNew.position.x = THREE.MathUtils.lerp(-0.1, 0, progress);
    nokiaNew.position.y = THREE.MathUtils.lerp(0, -0.05, progress);

    // Original on anvil
    nokiaOld.position.y = Math.sin(progress * Math.PI * 4) * 0.002;
  });

  return (
    <group>
      <primitive object={nokiaNew} scale={0.1} position={[-0.1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <primitive object={nokiaOld} scale={0.1} position={[0.1, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* Anvil */}
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[0.06, 0.03, 0.04]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};