import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const COLORS = {
  body: "#d9dde2",
  bodyLight: "#eef1f4",
  screen: "#050b12",
  dark: "#111827",
  metal: "#b8c0c8",
  metalDark: "#69737d",
  cyan: "#00f0ff",
  green: "#39ff88",
};

function GlowMaterial({ color, intensity = 2 }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      metalness={0.2}
      roughness={0.3}
    />
  );
}

function FaceEye({ type, position }) {
  if (type === "wink") {
    return (
      <mesh position={position} rotation={[0, 0, -0.12]}>
        <boxGeometry args={[0.34, 0.055, 0.025]} />
        <GlowMaterial color={COLORS.cyan} intensity={2} />
      </mesh>
    );
  }

  return (
    <mesh position={position} scale={[1, 1.15, 1]}>
      <sphereGeometry args={[0.13, 24, 24]} />
      <GlowMaterial color={COLORS.cyan} intensity={2} />
    </mesh>
  );
}

function FaceMouth() {
  return (
    <group position={[0, 1.22, 0.665]}>
      <mesh position={[-0.13, 0, 0]}>
        <boxGeometry args={[0.09, 0.045, 0.025]} />
        <GlowMaterial color={COLORS.cyan} intensity={2} />
      </mesh>

      <mesh position={[0, -0.025, 0]}>
        <boxGeometry args={[0.09, 0.045, 0.025]} />
        <GlowMaterial color={COLORS.cyan} intensity={2} />
      </mesh>

      <mesh position={[0.13, 0, 0]}>
        <boxGeometry args={[0.09, 0.045, 0.025]} />
        <GlowMaterial color={COLORS.cyan} intensity={2} />
      </mesh>
    </group>
  );
}

function StatusLight() {
  return (
    <mesh position={[0.52, 0.82, 0.665]}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <GlowMaterial color={COLORS.green} intensity={2.5} />
    </mesh>
  );
}

function FaceButtons() {
  return (
    <group position={[0, 0.82, 0.665]}>
      <mesh
        position={[-0.2, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
        <meshStandardMaterial
          color={COLORS.metalDark}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      <mesh
        position={[0.2, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <cylinderGeometry args={[0.075, 0.075, 0.035, 24]} />
        <meshStandardMaterial
          color={COLORS.metalDark}
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function ShoulderJoint({ side, angle = 0 }) {
  const direction = side === "left" ? -1 : 1;
  const radians = (angle * Math.PI) / 180;

  return (
    <group
      position={[direction * 1.2, 0.45, 0]}
      rotation={[0, 0, radians * direction * 0.45]}
    >
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 0.28, 24]} />
        <meshStandardMaterial
          color={COLORS.metal}
          metalness={0.9}
          roughness={0.18}
        />
      </mesh>

      <mesh position={[direction * 0.16, 0, 0]}>
        <sphereGeometry args={[0.19, 24, 24]} />
        <meshStandardMaterial
          color={COLORS.metalDark}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function Arm({ side, servoAngle = 0 }) {
  const armRef = useRef();
  const direction = side === "left" ? -1 : 1;

  useFrame(() => {
    if (!armRef.current) {
      return;
    }

    const radians = (servoAngle * Math.PI) / 180;

    armRef.current.rotation.z =
      radians * direction * 0.45;
  });

  return (
    <group
      ref={armRef}
      position={[direction * 1.25, 0.3, 0]}
    >
      <mesh position={[direction * 0.28, -0.43, 0]}>
        <RoundedBox
          args={[0.36, 0.9, 0.36]}
          radius={0.12}
          smoothness={4}
        >
          <meshStandardMaterial
            color={COLORS.body}
            metalness={0.3}
            roughness={0.4}
          />
        </RoundedBox>
      </mesh>

      <mesh position={[direction * 0.28, -0.93, 0]}>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color={COLORS.metal}
          metalness={0.9}
          roughness={0.17}
        />
      </mesh>

      <mesh position={[direction * 0.28, -1.18, 0]}>
        <RoundedBox
          args={[0.43, 0.42, 0.4]}
          radius={0.1}
          smoothness={4}
        >
          <meshStandardMaterial
            color={COLORS.body}
            metalness={0.3}
            roughness={0.4}
          />
        </RoundedBox>
      </mesh>

      <mesh position={[direction * 0.28, -1.45, 0]}>
        <sphereGeometry args={[0.17, 24, 24]} />
        <meshStandardMaterial
          color={COLORS.metal}
          metalness={0.9}
          roughness={0.16}
        />
      </mesh>
    </group>
  );
}

function ServoModule({ angle = 0 }) {
  const servoRef = useRef();

  useFrame(() => {
    if (!servoRef.current) {
      return;
    }

    servoRef.current.rotation.z =
      (angle * Math.PI) / 180;
  });

  return (
    <group position={[0, -0.25, 0.74]}>
      <RoundedBox
        args={[0.52, 0.42, 0.32]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.6}
          roughness={0.25}
        />
      </RoundedBox>

      <group ref={servoRef}>
        <mesh position={[0, 0, 0.2]}>
          <boxGeometry args={[1.35, 0.07, 0.06]} />
          <meshStandardMaterial
            color={COLORS.metal}
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>

        <mesh position={[0, 0, 0.23]}>
          <cylinderGeometry args={[0.07, 0.07, 0.1, 20]} />
          <meshStandardMaterial
            color={COLORS.dark}
            metalness={0.85}
            roughness={0.18}
          />
        </mesh>
      </group>
    </group>
  );
}

function Foot({ side }) {
  const direction = side === "left" ? -1 : 1;

  return (
    <mesh position={[direction * 0.48, -1.45, 0]}>
      <RoundedBox
        args={[0.7, 0.25, 0.85]}
        radius={0.11}
        smoothness={5}
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.55}
          roughness={0.3}
        />
      </RoundedBox>
    </mesh>
  );
}

export default function VirtualRobot({
  leftShoulder = 0,
  leftArm = 0,
  rightShoulder = 0,
  rightArm = 0,
}) {
  return (
    <group position={[0, 0, 0]}>
      <RoundedBox
        args={[2.3, 2.25, 1.35]}
        radius={0.22}
        smoothness={6}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial
          color={COLORS.body}
          metalness={0.3}
          roughness={0.4}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.65, 1.2, 0.08]}
        radius={0.08}
        smoothness={4}
        position={[0, -0.05, 0.69]}
      >
        <meshStandardMaterial
          color={COLORS.dark}
          metalness={0.25}
          roughness={0.4}
        />
      </RoundedBox>

      <mesh position={[0, 0.35, 0.735]}>
        <boxGeometry args={[0.9, 0.045, 0.025]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      <mesh position={[0, 0.2, 0.735]}>
        <boxGeometry args={[0.65, 0.045, 0.025]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      <RoundedBox
        args={[1.72, 1.25, 1.22]}
        radius={0.24}
        smoothness={7}
        position={[0, 1.42, 0]}
      >
        <meshStandardMaterial
          color={COLORS.bodyLight}
          metalness={0.2}
          roughness={0.4}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.38, 0.8, 0.07]}
        radius={0.12}
        smoothness={5}
        position={[0, 1.43, 0.62]}
      >
        <meshStandardMaterial
          color={COLORS.screen}
          metalness={0.1}
          roughness={0.3}
        />
      </RoundedBox>

      <FaceEye
        type="wink"
        position={[-0.35, 1.56, 0.665]}
      />

      <FaceEye
        type="normal"
        position={[0.35, 1.56, 0.665]}
      />

      <FaceMouth />

      <StatusLight />
      <FaceButtons />

      <ShoulderJoint
        side="left"
        angle={leftShoulder}
      />

      <ShoulderJoint
        side="right"
        angle={rightShoulder}
      />

      <Arm
        side="left"
        servoAngle={leftArm}
      />

      <Arm
        side="right"
        servoAngle={rightArm}
      />

      <ServoModule angle={0} />

      <Foot side="left" />
      <Foot side="right" />
    </group>
  );
}