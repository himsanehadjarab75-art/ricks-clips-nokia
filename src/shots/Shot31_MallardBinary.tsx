import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot31_MallardBinary: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: campus } = useGLTF("/assets/models/jpl_campus.glb");
  const { scene: mallard } = useGLTF("/assets/models/mallard.glb");
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");

  useFrame(() => {
    if (mallard) {
      // Mallard takeoff
      mallard.position.y = THREE.MathUtils.lerp(0, 10, progress);
      mallard.position.z = THREE.MathUtils.lerp(0, -5, progress);
      mallard.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 4, progress);
    }
  });

  return (
    <group>
      <primitive object={campus} scale={1} position={[0, 0, 0]} />
      <primitive object={mallard} scale={0.5} position={[0, 0, 0]} />
      <primitive object={nokia} scale={0.2} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* Binary ripple shader on pond */}
    </group>
  );
};