import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot25_GoldstoneFail: React.FC<{ progress: number }> = ({ progress }) => {
  const goldstoneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!goldstoneRef.current) return;

    const color = progress > 0.3 ? "#FF0000" : "#00FF00";
    goldstoneRef.current.material.color.set(color);
  });

  return (
    <group>
      <mesh ref={goldstoneRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="#222222" metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  );
};