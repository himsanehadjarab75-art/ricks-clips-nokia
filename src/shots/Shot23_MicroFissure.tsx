import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot23_MicroFissure: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: coupler } = useGLTF("/assets/models/audio_coupler.glb");

  const fissureRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!fissureRef.current) return;

    // Fissure opening
    fissureRef.current.scale.x = THREE.MathUtils.lerp(0, 1, progress);
    fissureRef.current.material.emissiveIntensity = Math.sin(progress * Math.PI * 10) * 0.5 + 0.5;
  });

  return (
    <group>
      <primitive object={coupler} scale={0.5} position={[0, 0, 0]} />
      <mesh ref={fissureRef} name="micro_fissure" position={[0, 0, 0]}>
        <planeGeometry args={[0.0001, 0.0005]} />
        <meshBasicMaterial
          color="#FF4500"
          emissive="#FF4500"
          emissiveIntensity={0}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};