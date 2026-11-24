import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot11_Armpit: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");
  const { scene: jacket } = useGLTF("/assets/models/coder_jacket.glb");

  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    // LCD fading then recovering
    const fade = progress < 0.4 ? progress * 2.5 : 1 - (progress - 0.4) * 1.67;
    screenRef.current.material.opacity = THREE.MathUtils.clamp(fade, 0.1, 1);
    screenRef.current.material.color.setHSL(0.3, 1, 0.5 * fade);

    // Phone moving into armpit
    nokia.position.y = THREE.MathUtils.lerp(0, -0.05, progress);
    nokia.position.z = THREE.MathUtils.lerp(0, 0.03, progress);
  });

  return (
    <group>
      <primitive object={jacket} scale={0.3} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <primitive object={nokia} scale={0.1} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={screenRef} name="screen">
          <planeGeometry args={[0.04, 0.03]} />
          <meshBasicMaterial color="#00FF00" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      </primitive>
    </group>
  );
};