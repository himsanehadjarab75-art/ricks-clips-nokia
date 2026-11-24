import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot28_VargasSmirk: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: vargas } = useGLTF("/assets/models/vargas_face.glb");

  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mouthRef.current) return;

    // Smirk animation
    mouthRef.current.rotation.z = THREE.MathUtils.lerp(0, 0.15, progress);
    mouthRef.current.scale.x = THREE.MathUtils.lerp(1, 1.3, progress);
  });

  return (
    <group>
      <primitive object={vargas} scale={1} position={[0, 0, 0]} />
      <mesh ref={mouthRef} name="smirk_mouth" position={[0, -0.03, 0.08]}>
        <boxGeometry args={[0.04, 0.01, 0.005]} />
        <meshStandardMaterial color="#8B4513" roughness={0.7} />
      </mesh>
    </group>
  );
};