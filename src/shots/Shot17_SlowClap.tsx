import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot17_SlowClap: React.FC<{ progress: number }> = ({ progress }) => {
  const handRef = useRef<THREE.Mesh>(null);
  const chargerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!handRef.current || !chargerRef.current) return;

    const clap = Math.sin(progress * Math.PI * 1.5);
    handRef.current.rotation.x = THREE.MathUtils.lerp(-0.5, 0.5, (clap + 1) / 2);
    chargerRef.current.rotation.z = Math.sin(progress * Math.PI * 4) * 0.3;
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.2]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh ref={handRef} position={[-0.3, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.12, 0.03]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} />
      </mesh>
      <mesh ref={chargerRef} position={[0.3, 0, 0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <meshStandardMaterial color="#FFF" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
};