import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot31_MallardBinary: React.FC<{ progress: number }> = ({ progress }) => {
  const mallardRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mallardRef.current) return;

    mallardRef.current.position.y = THREE.MathUtils.lerp(0, 10, progress);
    mallardRef.current.position.z = THREE.MathUtils.lerp(0, -5, progress);
    mallardRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 4, progress);
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh ref={mallardRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.42, 0.9, 0.18]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
    </group>
  );
};