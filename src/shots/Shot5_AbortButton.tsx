import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot5_AbortButton: React.FC<{ progress: number }> = ({ progress }) => {
  const buttonRef = useRef<THREE.Mesh>(null);
  const glassesRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!buttonRef.current || !glassesRef.current) return;

    const pulse = Math.sin(progress * Math.PI * 8) * 0.5 + 0.5;
    buttonRef.current.material.emissiveIntensity = pulse;
    buttonRef.current.scale.setScalar(1 + pulse * 0.05);
    glassesRef.current.material.envMapIntensity = pulse;
  });

  return (
    <group>
      {/* Vargas face rig */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Abort button */}
      <mesh ref={buttonRef} position={[0.15, -0.05, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
        <meshStandardMaterial color="#FF0000" emissive="#FF0000" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Glasses */}
      <mesh ref={glassesRef} position={[0, 0, 0.15]}>
        <torusGeometry args={[0.04, 0.008, 8, 32]} />
        <meshPhysicalMaterial color="#111" metalness={0.9} roughness={0.1} transmission={0.9} thickness={0.01} envMapIntensity={1} />
      </mesh>
    </group>
  );
};