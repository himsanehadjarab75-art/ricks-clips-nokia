import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot4_SplitScreen: React.FC<{ progress: number }> = ({ progress }) => {
  const jplRef = useRef<THREE.Mesh>(null);
  const coderRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (jplRef.current) jplRef.current.material.opacity = progress;
    if (coderRef.current) coderRef.current.material.opacity = progress;
  });

  return (
    <group>
      {/* LEFT: Mission Control */}
      <mesh ref={jplRef} position={[-2, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.5} />
      </mesh>

      {/* RIGHT: Coder at dish */}
      <mesh ref={coderRef} position={[2, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.3]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.7} roughness={0.5} />
      </mesh>
    </group>
  );
};