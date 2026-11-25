import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export const Shot3_CherryPicker: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/public/assets/models/dish_full.glb");
  const { scene: picker } = useGLTF("/public/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/public/assets/models/coder_rig.glb");
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");

  useFrame(() => {
    // Dish slewing slowly
    dish.rotation.y = progress * 0.02;

    // Cherry picker hydraulic movement
    picker.position.y = THREE.MathUtils.lerp(6, 8, progress);
  });

  return (
    <group>
      <primitive object={dish} scale={1} position={[0, 0, 0]} />
      <primitive object={picker} scale={1} position={[-5, 0, 12]} />
      <primitive object={coder} scale={0.8} position={[-5, 8, 12]} />
      <primitive object={nokia} scale={0.2} position={[-5, 9.5, 12.5]} rotation={[0, Math.PI, 0]} />
    </group>
  );
};