import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot20_Cleanroom: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");

  const tagRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!tagRef.current) return;

    // Asset tag appearing
    tagRef.current.position.z = THREE.MathUtils.lerp(-0.05, 0, progress);
    tagRef.current.material.opacity = progress;
  });

  return (
    <group>
      <primitive object={nokia} scale={0.15} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh ref={tagRef} name="asset_tag" position={[0.04, 0.02, 0]}>
        <planeGeometry args={[0.03, 0.015]} />
        <meshBasicMaterial
          color="#FFF"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* TWTA spare */}
      <mesh position={[-0.1, 0, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.12]} />
        <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};