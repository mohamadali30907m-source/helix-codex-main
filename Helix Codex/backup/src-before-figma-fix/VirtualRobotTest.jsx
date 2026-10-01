import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import VirtualRobot from "./components/VirtualRobot/VirtualRobot";

const BACKGROUND = "#0B0F19";

function VirtualRobotTest() {
  const [leftShoulder, setLeftShoulder] = useState(0);
  const [leftArm, setLeftArm] = useState(0);
  const [rightShoulder, setRightShoulder] = useState(0);
  const [rightArm, setRightArm] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: BACKGROUND,
        position: "relative",
      }}
    >
      <Canvas
        camera={{
          position: [0, 1.2, 6],
          fov: 45,
        }}
      >
        <hemisphereLight
          skyColor="#dbeafe"
          groundColor="#020617"
          intensity={1.4}
        />

        <directionalLight
          position={[4, 6, 5]}
          intensity={2.8}
          castShadow
        />

        <directionalLight
          position={[-4, 3, 2]}
          intensity={1.2}
        />

        <pointLight
          position={[0, 2.8, 3]}
          intensity={18}
          distance={8}
          color="#00f0ff"
        />

        <pointLight
          position={[0, 0, -3]}
          intensity={8}
          distance={7}
          color="#1d4ed8"
        />

        <VirtualRobot
          leftShoulder={leftShoulder}
          leftArm={leftArm}
          rightShoulder={rightShoulder}
          rightArm={rightArm}
        />

        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={4.5}
          maxDistance={9}
          minPolarAngle={Math.PI * 0.28}
          maxPolarAngle={Math.PI * 0.68}
          target={[0, 0, 0]}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "260px",
          padding: "18px",
          background: "rgba(3, 7, 18, 0.9)",
          border: "1px solid rgba(0, 240, 255, 0.25)",
          borderRadius: "12px",
          color: "#f9fafb",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ marginBottom: "14px", fontWeight: "700" }}>
          VIRTUAL ROBOT TEST
        </div>

        <label>
          Left Shoulder: {leftShoulder}°
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={leftShoulder}
          onChange={(event) =>
            setLeftShoulder(Number(event.target.value))
          }
          style={{ width: "100%" }}
        />

        <label>
          Left Arm: {leftArm}°
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={leftArm}
          onChange={(event) =>
            setLeftArm(Number(event.target.value))
          }
          style={{ width: "100%" }}
        />

        <label>
          Right Shoulder: {rightShoulder}°
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={rightShoulder}
          onChange={(event) =>
            setRightShoulder(Number(event.target.value))
          }
          style={{ width: "100%" }}
        />

        <label>
          Right Arm: {rightArm}°
        </label>
        <input
          type="range"
          min="-90"
          max="90"
          value={rightArm}
          onChange={(event) =>
            setRightArm(Number(event.target.value))
          }
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}

export default VirtualRobotTest;