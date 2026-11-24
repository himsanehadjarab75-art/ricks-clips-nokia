import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot5_AbortButton: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: vargas } = useGLTF("/assets/models/vargas_face.glb");

  const buttonRef = useRef<THREE.Mesh>(null);
  const glassesRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!buttonRef.current || !glassesRef.current) return;

    // Button pulse
    const pulse = Math.sin(progress * Math.PI * 8) * 0.5 + 0.5;
    buttonRef.current.material.emissiveIntensity = pulse;
    buttonRef.current.scale.setScalar(1 + pulse * 0.05);

    // Glasses reflection animation
    glassesRef.current.material.envMapIntensity = pulse;
  });

  return (
    <group>
      <primitive object={vargas} scale={1} position={[0, 0, 0]} />
      <mesh ref={buttonRef} name="abort_button" position={[0.15, -0.05, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
        <meshStandardMaterial
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={glassesRef} name="glasses">
        <torusGeometry args={[0.04, 0.008, 8, 32]} />
        <meshPhysicalMaterial
          color="#111"
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.01}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
};