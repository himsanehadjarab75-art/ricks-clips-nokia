import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot22_Mallard: React.FC<{ progress: number }> = ({ progress }) => {
  const mallardRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mallardRef.current) return;

    mallardRef.current.position.y = THREE.MathUtils.lerp(0.5, 0, progress);
    mallardRef.current.rotation.x = THREE.MathUtils.lerp(-0.3, 0, progress);
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.1, 0.1]} />
        <meshStandardMaterial color="#2E8B57" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh ref={mallardRef} position={[0, 0.5, 0]}>
        <boxGeometry args={[0.15, 0.08, 0.08]} />
        <meshStandardMaterial color="#8B4513" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
};