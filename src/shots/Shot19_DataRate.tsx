import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot19_DataRate: React.FC<{ progress: number }> = ({ progress }) => {
  const rateRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!rateRef.current) return;

    rateRef.current.rotation.z = progress * Math.PI * 4;
  });

  return (
    <group>
      <mesh ref={rateRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.1, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.02]} />
          <meshStandardMaterial color="#FFD700" transparent opacity={progress > i * 0.1 ? 1 : 0} />
        </mesh>
      ))}
    </group>
  );
};