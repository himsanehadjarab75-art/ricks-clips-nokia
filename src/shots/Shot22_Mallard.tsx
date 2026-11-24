import { useFrame } from "@react-three/fiber";
import { useGLTF, group } from "@react-three/drei";
import * as THREE from "three";

const barStyles = `
  @keyframes bar1 { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
  @keyframes bar2 { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
  @keyframes bar3 { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
  @keyframes bar4 { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
  @keyframes bar5 { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
`;

export const Shot22_Mallard: React.FC<{ progress: number }> = ({ progress }) => {
  const { scene: mallard } = useGLTF("/public/assets/models/mallard.glb");
  const { scene: nokia } = useGLTF("/public/assets/models/nokia_3310.glb");

  useFrame(() => {
    if (mallard) {
      // Mallard landing
      mallard.position.y = THREE.MathUtils.lerp(0.5, 0, progress);
      mallard.rotation.x = THREE.MathUtils.lerp(-0.3, 0, progress);
    }
  });

  return (
    <group>
      <primitive object={mallard} scale={0.5} position={[0, 0, 0]} />
      <primitive object={nokia} scale={0.15} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
      {/* Signal bars */}
      <Html fullscreen>
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "4px",
            opacity: progress,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: "8px",
                height: `${i * 20}px`,
                background: i <= 5 ? "#00FF00" : "#333",
                borderRadius: "2px",
                animation: `bar${i} 0.5s ${i * 0.1}s ease-out forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      </Html>
      <style dangerouslySetInnerHTML={{ __html: barStyles }} />
    </group>
  );
};