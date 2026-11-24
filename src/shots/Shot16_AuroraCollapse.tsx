import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot16_AuroraCollapse: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/assets/models/dish_full.glb");
  const { scene: picker } = useGLTF("/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/assets/models/coder_rig.glb");

  useFrame((state) => {
    // Aurora shader on sky
    // Coder collapse
    if (coder) {
      coder.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 2, progress);
      coder.position.y = THREE.MathUtils.lerp(8, 6, progress);
    }
  });

  return (
    <group>
      <primitive object={dish} scale={1} position={[0, 0, 0]} />
      <primitive object={picker} scale={1} position={[-5, 0, 12]} />
      <primitive object={coder} scale={0.8} position={[-5, 8, 12]} />
      {/* Aurora sky shader applied via background */}
    </group>
  );
};