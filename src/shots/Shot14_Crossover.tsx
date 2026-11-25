import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot14_Crossover: React.FC<{ progress: number }> = ({ progress }) => {
  const crossed = progress > 0.5;
  const goldstoneRef = useRef<THREE.Mesh>(null);
  const coderRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!goldstoneRef.current || !coderRef.current) return;

    goldstoneRef.current.material.color.set("#FF0000");
    coderRef.current.material.color.set(crossed ? "#00FF00" : "#FFD700");
  });

  return (
    <group>
      <mesh ref={goldstoneRef} position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FF0000" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh ref={coderRef} position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
      </mesh>
      {crossed && (
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={1} />
        </mesh>
      )}
    </group>
  );
};