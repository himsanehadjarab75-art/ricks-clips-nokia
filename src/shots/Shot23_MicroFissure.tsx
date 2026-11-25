import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot23_MicroFissure: React.FC<{ progress: number }> = ({ progress }) => {
  const fissureRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!fissureRef.current) return;

    fissureRef.current.scale.x = THREE.MathUtils.lerp(0, 1, progress);
    fissureRef.current.material.emissiveIntensity = Math.sin(progress * Math.PI * 10) * 0.5 + 0.5;
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="#222" metalness={0.7} roughness={0.5} />
      </mesh>
      <mesh ref={fissureRef} position={[0, 0, 0]}>
        <planeGeometry args={[0.0001, 0.0005]} />
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF4500"
          emissiveIntensity={0}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};