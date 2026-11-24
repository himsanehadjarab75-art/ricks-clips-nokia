import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot10_DronePullback: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/assets/models/dish_full.glb");
  const { scene: picker } = useGLTF("/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/assets/models/coder_rig.glb");

  useFrame((state) => {
    // Drone camera pull back
    state.camera.position.lerp(
      new THREE.Vector3(-15 * progress, 20 * progress, 30 * progress),
      0.1
    );
    state.camera.lookAt(0, 2, 0);

    // Dish tracking
    dish.rotation.y = progress * 0.02;

    // Star trails
    // (handled by starfield shader)
  });

  return (
    <group>
      <primitive object={dish} scale={1} position={[0, 0, 0]} />
      <primitive object={picker} scale={1} position={[-5, 0, 12]} />
      <primitive object={coder} scale={0.8} position={[-5, 8, 12]} />
      {/* Starfield handled by background shader */}
    </group>
  );
};