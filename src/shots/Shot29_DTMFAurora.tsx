import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot29_DTMFAurora: React.FC<{ progress: number }> = ({ progress }) => {
  const dishRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (dishRef.current) {
      dishRef.current.rotation.y = progress * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={dishRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh position={[-5, 0, 12]}>
        <boxGeometry args={[0.5, 0.3, 1]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[-5, 8, 12]}>
        <boxGeometry args={[0.4, 0.6, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
};