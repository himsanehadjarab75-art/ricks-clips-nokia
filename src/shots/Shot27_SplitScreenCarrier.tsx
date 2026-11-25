import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot27_SplitScreenCarrier: React.FC<{ progress: number }> = ({ progress }) => {
  const goldstoneRef = useRef<THREE.Mesh>(null);
  const coderRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!goldstoneRef.current || !coderRef.current) return;

    const ruptured = progress > 0.3;
    goldstoneRef.current.material.color.set(ruptured ? "#FF0000" : "#00FF00");
    goldstoneRef.current.material.emissiveIntensity = ruptured ? 0.5 : 0;
    coderRef.current.material.color.set("#FF0000");
    coderRef.current.material.emissiveIntensity = ruptured ? 0.5 : 0;
  });

  return (
    <group>
      <mesh ref={goldstoneRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh ref={coderRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#00FF00" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.01]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};