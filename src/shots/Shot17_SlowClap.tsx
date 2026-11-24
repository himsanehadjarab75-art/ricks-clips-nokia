import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot17_SlowClap: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: vargas } = useGLTF("/assets/models/vargas_rig.glb");

  const handRef = useRef<THREE.Mesh>(null);
  const chargerRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!handRef.current || !chargerRef.current) return;

    // Slow clap
    const clap = Math.sin(progress * Math.PI * 1.5);
    handRef.current.rotation.x = THREE.MathUtils.lerp(-0.5, 0.5, (clap + 1) / 2);

    // Charger cable whip
    chargerRef.current.rotation.z = Math.sin(progress * Math.PI * 4) * 0.3;
  });

  return (
    <group>
      <primitive object={vargas} scale={1} position={[0, 0, 0]} />
      <mesh ref={handRef} name="clap_hand" position={[-0.3, 0, 0.5]}>
        <boxGeometry args={[0.08, 0.12, 0.03]} />
        <meshStandardMaterial color="#D2936C" roughness={0.7} />
      </mesh>
      <mesh ref={chargerRef} name="charger" position={[0.3, 0, 0.5]}>
        <cylinderGeometry args={[0.015, 0.015, 0.08, 8]} />
        <meshStandardMaterial color="#FFF" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
};