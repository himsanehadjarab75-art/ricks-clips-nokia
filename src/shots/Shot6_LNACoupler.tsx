import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot6_LNACoupler: React.FC<{ progress: number }> = ({ progress }) => {
  const couplerRef = useRef<THREE.Mesh>(null);
  const solderRefs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    if (!couplerRef.current) return;

    solderRefs.current.forEach((solder, i) => {
      solder.material.emissiveIntensity = Math.sin(progress * Math.PI * 6 + i) * 0.5 + 0.5;
    });

    couplerRef.current.position.x = Math.sin(progress * Math.PI * 2) * 0.002;
  });

  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.2, 0.2, 0.1]} />
        <meshStandardMaterial color="#1b2a3a" metalness={0.4} roughness={0.6} />
      </mesh>
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