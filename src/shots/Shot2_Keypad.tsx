import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export const Shot2_Keypad: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: nokia } = useGLTF("/assets/models/nokia_3310.glb");
  const { scene: dishMesh } = useGLTF("/assets/models/dish_mesh_closeup.glb");

  const screenRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!screenRef.current) return;

    // Animate thumb pressing keys
    const pressCycle = Math.sin(progress * Math.PI * 4) * 0.5 + 0.5;
    screenRef.current.material.opacity = pressCycle;

    // IMEI flash animation
    if (progress > 0.5 && progress < 0.7) {
      screenRef.current.material.emissiveIntensity = Math.sin((progress - 0.5) * 10) * 0.5;
    }
  });

  return (
    <group>
      <primitive object={dishMesh} scale={0.1} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
      <primitive
        object={nokia}
        scale={0.08}
        position={[0, 0, 0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh ref={screenRef} name="screen">
          <planeGeometry args={[0.04, 0.03]} />
          <meshBasicMaterial
            color="#00FF00"
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </primitive>
    </group>
  );
};