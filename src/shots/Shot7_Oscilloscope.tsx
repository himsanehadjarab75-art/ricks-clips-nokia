import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Shot7_Oscilloscope: React.FC<{ progress: number }> = ({ progress }) => {
  const locked = progress > 0.6;
  const gridRef = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Mesh>(null);
  const statusRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!gridRef.current || !waveRef.current || !statusRef.current) return;

    gridRef.current.rotation.z = Math.sin(progress * Math.PI * 0.5) * 0.05;
    waveRef.current.position.y = Math.sin(progress * Math.PI * 2) * 0.02;
    statusRef.current.material.color.setHex(locked ? 0x00ff00 : 0xffff00);
  });

  return (
    <group>
      <mesh ref={gridRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.01]} />
        <meshStandardMaterial color="#003300" metalness={0.2} roughness={0.8} />
      </mesh>
      <mesh ref={waveRef} position={[0, 0.1, 0]}>
        <boxGeometry args={[0.7, 0.005, 0.01]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
      </mesh>
      <mesh ref={statusRef} position={[0, -0.3, 0]}>
        <circleGeometry args={[0.04, 16]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};