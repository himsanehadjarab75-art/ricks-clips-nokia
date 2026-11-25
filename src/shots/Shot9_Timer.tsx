import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot9_Timer: React.FC<{ progress: number }> = ({ progress }) => {
  const thumbRef = useRef<THREE.Mesh>(null);
  const phoneRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(progress * Math.PI) * 0.25;
    }
    if (thumbRef.current) {
      thumbRef.current.position.z = Math.sin(progress * Math.PI * 20) * 0.01;
      thumbRef.current.rotation.x = Math.sin(progress * Math.PI * 20) * 0.02;
    }
  });

  return (
    <group>
      <group ref={phoneRef}>
        <mesh>
          <boxGeometry args={[0.42, 0.9, 0.18]} />
          <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.24, 0.095]}>
          <boxGeometry args={[0.3, 0.26, 0.02]} />
          <meshStandardMaterial color="#7fbf5f" emissive="#4caf50" emissiveIntensity={0.6} />
        </mesh>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh key={i} position={[(i % 3 - 1) * 0.1, -0.1 - Math.floor(i / 3) * 0.1, 0.095]}>
            <boxGeometry args={[0.07, 0.06, 0.02]} />
            <meshStandardMaterial color="#c9c9c9" metalness={0.2} roughness={0.7} />
          </mesh>
        ))}
        <mesh position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
          <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
      <mesh ref={thumbRef} position={[0, -0.18, 0.22]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#8B4513" roughness={0.85} metalness={0.05} />
      </mesh>
    </group>
  );
};