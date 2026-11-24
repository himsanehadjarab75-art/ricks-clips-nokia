import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { group } from "@react-three/drei";
import * as THREE from "three";

export const Shot6_LNACoupler: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");

  const couplerRef = useRef<THREE.Mesh>(null);
  const solderRefs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    if (!couplerRef.current) return;

    // Solder joint glint
    solderRefs.current.forEach((solder, i) => {
      solder.material.emissiveIntensity = Math.sin(progress * Math.PI * 6 + i) * 0.5 + 0.5;
    });

    // Tape rip animation
    couplerRef.current.position.x = Math.sin(progress * Math.PI * 2) * 0.002;
  });

  return (
    <group>
      <primitive object={nokia} scale={0.08} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh ref={couplerRef} name="audio_coupler" position={[0, 0, -0.05]}>
        <boxGeometry args={[0.02, 0.015, 0.01]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (solderRefs.current[i] = el!)}
          name={`solder_${i}`}
          position={[0.015, -0.005 + i * 0.005, -0.045]}
        >
          <sphereGeometry args={[0.001, 6, 6]} />
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
};