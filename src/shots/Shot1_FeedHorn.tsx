import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot1_FeedHorn: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/public/assets/models/dish_feed_horn.glb");
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");
  const { scene: hand } = useGLTF("/public/assets/models/gloved_hand.glb");

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Animate hand inserting phone
    const insertProgress = Math.min(progress * 2, 1);
    hand.position.z = THREE.MathUtils.lerp(0.2, -0.02, insertProgress);

    // Phone follows hand then stays
    if (insertProgress < 0.5) {
      nokia.position.copy(hand.position);
      nokia.rotation.copy(hand.rotation);
    }

    // Antenna skin ripple
    dish.children.forEach((child) => {
      if (child.name.includes("mesh")) {
        const mesh = child as THREE.Mesh;
        const pos = mesh.geometry.attributes.position;
        const time = progress * Math.PI * 4;
        for (let i = 0; i < pos.count; i++) {
          const y = pos.getY(i);
          pos.setY(i, y + Math.sin(y * 20 + time) * 0.001 * (1 - progress));
        }
        pos.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <primitive object={dish} scale={0.5} position={[0, 0, 0]} />
      <primitive object={hand} scale={0.3} position={[0, 0, 0.15]} rotation={[-Math.PI / 2, 0, 0]} />
      <primitive object={nokia} scale={0.15} position={[0, 0, 0]} />
    </group>
  );
};