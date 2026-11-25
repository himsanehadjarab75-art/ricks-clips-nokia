import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot8_Goldstone: React.FC<{ progress: number }> = ({ progress }) => {
  const goldstoneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (goldstoneRef.current) {
      goldstoneRef.current.rotation.y = progress * 0.03;
    }
  });

  return (
    <group>
      <mesh ref={goldstoneRef} position={[0, 0, -15]}>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};