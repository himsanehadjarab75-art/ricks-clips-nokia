import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot18_DawnStow: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/public/assets/models/dish_stowed.glb");
  const { scene: picker } = useGLTF("/public/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/public/assets/models/coder_rig.glb");

  useFrame(() => {
    // Dish stowing
    dish.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 2, progress);

    // Cherry picker descending
    picker.position.y = THREE.MathUtils.lerp(8, 0, progress);
    coder.position.y = THREE.MathUtils.lerp(8, 0, progress);
  });

  return (
    <group>
      <primitive object={dish} scale={1} position={[0, 0, 0]} />
      <primitive object={picker} scale={1} position={[-5, 0, 12]} />
      <primitive object={coder} scale={0.8} position={[-5, 8, 12]} />
    </group>
  );
};