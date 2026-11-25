import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot24_PocketAnvil: React.FC<{ progress: number }> = ({ progress }) => {
  useFrame(() => {});

  return (
    <group>
      <mesh position={[-0.1, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0.1, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[0.06, 0.03, 0.04]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};