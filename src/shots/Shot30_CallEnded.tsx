import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

export const Shot30_CallEnded: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");

  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    // Call ended screen
    screenRef.current.material.opacity = progress;
    screenRef.current.material.color.setHSL(0.55, 1, 0.5);
  });

  return (
    <group>
      <primitive object={nokia} scale={0.15} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh ref={screenRef} name="screen">
          <planeGeometry args={[0.04, 0.03]} />
          <meshBasicMaterial color="#00FFFF" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      </primitive>
      {/* Call ended overlay */}
      <Html fullscreen>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontFamily: "'Share Tech Mono', monospace",
            opacity: progress,
          }}
        >
          <div style={{ fontSize: "36px", color: "#00FFFF" }}>CALL ENDED 14:22:00</div>
          <div style={{ fontSize: "28px", color: "#FFD700", marginTop: "16px" }}>BATTERY: 1% • SIGNAL: █████</div>
        </div>
      </Html>
    </group>
  );
};