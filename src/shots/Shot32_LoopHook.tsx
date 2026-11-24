import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// IDENTICAL TO SHOT 1 - for seamless loop
export const Shot32_LoopHook: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: dish } = useGLTF("/assets/models/dish_feed_horn.glb");
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");
  const { scene: hand } = useGLTF("/assets/models/gloved_hand.glb");

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Same animation as Shot 1
    const insertProgress = Math.min(progress * 2, 1);
    hand.position.z = THREE.MathUtils.lerp(0.2, -0.02, insertProgress);

    if (insertProgress < 0.5) {
      nokia.position.copy(hand.position);
      nokia.rotation.copy(hand.rotation);
    }

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