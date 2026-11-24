import { useFrame } from "@react-three/fiber";
import { useGLTF, group } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

export const Shot26_ReturnToFeed: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/assets/models/dish_full.glb");
  const { scene: picker } = useGLTF("/assets/models/cherry_picker.glb");
  const { scene: coder } = useGLTF("/assets/models/coder_rig.glb");
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");

  useFrame(() => {
    // Cherry picker rising
    picker.position.y = THREE.MathUtils.lerp(0, 8, progress);
    coder.position.y = THREE.MathUtils.lerp(0, 8, progress);

    // Nokia taped back on feed
    nokia.position.y = THREE.MathUtils.lerp(0, 9.5, progress);
    nokia.position.z = THREE.MathUtils.lerp(0, 12.5, progress);
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