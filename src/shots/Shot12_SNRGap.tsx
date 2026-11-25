import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot12_SNRGap: React.FC<{ progress: number }> = ({ progress }) => {
  const goldstoneSNR = -12;
  const coderSNR = -14 + progress * 4;

  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!leftRef.current || !rightRef.current) return;

    const leftColor = goldstoneSNR > coderSNR ? "#FF0000" : "#00FF00";
    const rightColor = coderSNR > goldstoneSNR ? "#00FF00" : "#FFD700";

    leftRef.current.material.color.set(leftColor);
    rightRef.current.material.color.set(rightColor);
  });

  return (
    <group>
      <mesh ref={leftRef} position={[-1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FF0000" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh ref={rightRef} position={[1.5, 0, 0]}>
        <boxGeometry args={[1, 0.5, 0.1]} />
        <meshStandardMaterial color="#FFD700" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
};