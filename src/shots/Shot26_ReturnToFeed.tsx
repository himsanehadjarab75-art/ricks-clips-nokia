import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot26_ReturnToFeed: React.FC<{ progress: number }> = ({ progress }) => {
  const dishRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (dishRef.current) {
      // Cherry picker rising
      dishRef.current.position.y = THREE.MathUtils.lerp(0, 8, progress);
      dishRef.current.position.z = THREE.MathUtils.lerp(0, 12.5, progress);
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
      <mesh position={[-5, 9.5, 12.5]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
};