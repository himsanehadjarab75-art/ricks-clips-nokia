import { useFrame } from "@react-three/fiber";
import { useGLTF, group } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export const Shot29_DTMFAurora: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/public/assets/models/dish_full.glb");
  const { scene: picker } = useGLTF("/public/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/public/assets/models/coder_rig.glb");

  useFrame(() => {
    // Dish slewing
    dish.rotation.y = progress * 0.05;

    // Coder shouting
    if (coder) {
      coder.rotation.y = Math.sin(progress * Math.PI * 8) * 0.1;
    }
  });

  return (
    <group>
      <primitive object={dish} scale={1} position={[0, 0, 0]} />
      <primitive object={picker} scale={1} position={[-5, 0, 12]} />
      <primitive object={coder} scale={0.8} position={[-5, 8, 12]} />
    </group>
  );
};