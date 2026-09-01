import { useEffect, useState, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Navbar from "../components/layout/Navbar";
import VirtualRobot from "../components/VirtualRobot/VirtualRobot";
import "./Teleop.css";

const BACKEND_URL = "http://127.0.0.1:8000";

const INITIAL_JOINTS = [
  { id: "LS", name: "LEFT SHOULDER", pos: 0 },
  { id: "LA", name: "LEFT ARM", pos: 0 },
  { id: "RS", name: "RIGHT SHOULDER", pos: 0 },
  { id: "RA", name: "RIGHT ARM", pos: 0 },
];

function Teleop() {
  const [connected, setConnected] = useState(false);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [mode, setMode] = useState("idle");
  const [joints, setJoints] = useState(INITIAL_JOINTS);
  const [gripper, setGripper] = useState(0);

  const isMountedRef = useRef(true);

  const syncRobotState = useCallback((data) => {
    setConnected(Boolean(data.connected));
    setEmergencyStop(Boolean(data.emergency_stop));
    setMode(data.mode ?? "idle");

    if (data.joints) {
      setJoints((current) =>
        current.map((joint) => ({
          ...joint,
          pos: typeof data.joints[joint.id] === "number" ? data.joints[joint.id] : joint.pos,
        }))
      );
    }

    if (typeof data.gripper === "number") {
      setGripper(data.gripper);
    }
  }, []);

  const requestRobot = async (endpoint, options = {}) => {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`);
    }
    const data = await response.json();
    syncRobotState(data);
    return data;
  };

  useEffect(() => {
    isMountedRef.current = true;
    let timeoutId;

    const pollStatus = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/robot/status`);
        if (!response.ok) throw new Error("Status request failed");
        const data = await response.json();
        if (isMountedRef.current) syncRobotState(data);
      } catch (error) {
        if (isMountedRef.current) {
          setConnected(false);
          setMode("idle");
        }
      } finally {
        if (isMountedRef.current) {
          timeoutId = setTimeout(pollStatus, 2000);
        }
      }
    };

    pollStatus();

    return () => {
      isMountedRef.current = false;
      clearTimeout(timeoutId);
    };
  }, [syncRobotState]);

  const handleConnect = async () => {
    try {
      await requestRobot("/api/robot/connect", { method: "POST" });
    } catch (error) {
      setConnected(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await requestRobot("/api/robot/disconnect", { method: "POST" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommand = async (command) => {
    if (!connected || emergencyStop) return;
    try {
      await requestRobot("/api/robot/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleHome = async () => {
    if (!connected || emergencyStop) return;
    try {
      await requestRobot("/api/robot/reset", { method: "POST" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmergencyStop = async () => {
    try {
      await requestRobot("/api/robot/emergency-stop", { method: "POST" });
    } catch (error) {
      setConnected(false);
      setEmergencyStop(true);
      setMode("emergency_stop");
    }
  };

  const moveJoint = async (id, delta) => {
    if (!connected || emergencyStop) return;

    let targetAngle = 0;
    setJoints((current) =>
      current.map((j) => {
        if (j.id === id) {
          targetAngle = Math.max(-90, Math.min(90, j.pos + delta));
          return { ...j, pos: targetAngle };
        }
        return j;
      })
    );

    try {
      await requestRobot("/api/robot/joint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ joint: id, angle: targetAngle }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGripperChange = async (event) => {
    if (!connected || emergencyStop) return;

    const value = Number(event.target.value);
    setGripper(value);

    try {
      await requestRobot("/api/robot/gripper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getJointPos = (id) => joints.find((j) => j.id === id)?.pos ?? 0;

  return (
    <div className="teleop-page">
      <Navbar />

      <main className="main-content">
        <header className="page-header">
          <h1 className="page-title">TELEOPERATION</h1>
          <p className="page-subtitle">Mimo Remote Control Interface</p>
        </header>

        <section className="teleop-layout">
          <aside className="teleop-card connection-card">
            <div className="teleop-header">
              <h2 className="card-title">CONNECTION</h2>
              <span className={`conn-badge ${connected ? "online" : "offline"}`}>
                {connected ? "CONNECTED" : "OFFLINE"}
              </span>
            </div>

            <div className="connection-status">
              <span className={`status-dot ${connected ? "active" : ""}`} />
              <span>{connected ? "Mimo control link active" : "Mimo control link inactive"}</span>
            </div>

            {!connected ? (
              <button className="teleop-btn connect" onClick={handleConnect} disabled={emergencyStop}>
                Connect to Mimo
              </button>
            ) : (
              <button className="teleop-btn disconnect" onClick={handleDisconnect}>
                Disconnect
              </button>
            )}

            <button className="teleop-btn home" onClick={handleHome} disabled={!connected || emergencyStop}>
              Home Position
            </button>

            <button
              className="teleop-btn connect"
              onClick={() => handleCommand(mode === "running" ? "stop" : "start")}
              disabled={!connected || emergencyStop}
            >
              {mode === "running" ? "Stop Robot" : "Start Robot"}
            </button>

            <button className="teleop-btn estop" onClick={handleEmergencyStop}>
              Emergency Stop
            </button>
          </aside>

          <section className="teleop-card robot-card">
            <div className="teleop-header">
              <div>
                <h2 className="card-title">MIMO</h2>
                <p className="page-subtitle" style={{ margin: 0 }}>Virtual robotic control model</p>
              </div>

              <span className="robot-indicator">
                {emergencyStop ? "EMERGENCY STOP" : connected ? (mode === "running" ? "RUNNING" : "READY") : "STANDBY"}
              </span>
            </div>

            <div className="robot-preview">
              <Canvas camera={{ position: [0, 0.35, 6.5], fov: 42 }}>
                <ambientLight intensity={1.5} />
                <directionalLight position={[4, 5, 6]} intensity={2.2} />
                <directionalLight position={[-4, 2, 3]} intensity={1.2} />
                <pointLight position={[0, 3, 4]} intensity={1.5} />

                <VirtualRobot
                  leftShoulder={getJointPos("LS")}
                  leftArm={getJointPos("LA")}
                  rightShoulder={getJointPos("RS")}
                  rightArm={getJointPos("RA")}
                />

                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  autoRotate
                  autoRotateSpeed={1.0}
                  minPolarAngle={Math.PI / 2.5}
                  maxPolarAngle={Math.PI / 1.8}
                />
              </Canvas>
            </div>
          </section>

          <aside className="teleop-card status-card">
            <h2 className="card-title">SYSTEM STATUS</h2>

            <div className="status-list">
              <div className="status-row">
                <span>CONNECTION</span>
                <strong className={connected ? "green" : "muted"}>{connected ? "ONLINE" : "OFFLINE"}</strong>
              </div>

              <div className="status-row">
                <span>SERVO SYSTEM</span>
                <strong className={connected && !emergencyStop ? "green" : "muted"}>
                  {emergencyStop ? "STOPPED" : connected ? "ACTIVE" : "IDLE"}
                </strong>
              </div>

              <div className="status-row">
                <span>CONTROL MODE</span>
                <strong>MANUAL</strong>
              </div>

              <div className="status-row">
                <span>ROBOT</span>
                <strong>Codex</strong>
              </div>

              <div className="status-row">
                <span>ROBOT MODE</span>
                <strong>{emergencyStop ? "EMERGENCY STOP" : mode.toUpperCase()}</strong>
              </div>
            </div>
          </aside>

          <section className="teleop-card joint-card">
            <div className="teleop-header">
              <div>
                <h2 className="card-title">JOINT CONTROL</h2>
                <p className="page-subtitle" style={{ margin: 0 }}>Four-axis Mimo arm control</p>
              </div>
            </div>

            <div className="joint-controls">
              {joints.map((joint) => {
                const percentage = ((joint.pos + 90) / 180) * 100;

                return (
                  <div className="joint-control-row" key={joint.id}>
                    <div className="joint-name">
                      <span className="joint-id">{joint.id}</span>
                      <span className="joint-label">{joint.name}</span>
                    </div>

                    <button
                      className="joint-btn"
                      onClick={() => moveJoint(joint.id, -5)}
                      disabled={!connected || emergencyStop}
                    >
                      −
                    </button>

                    <div className="joint-bar-track">
                      <div
                        className={`joint-bar-fill ${connected && !emergencyStop ? "active" : ""}`}
                        style={{ width: `${percentage}%` }}
                      />
                      <div className="joint-center-mark" />
                    </div>

                    <span className="joint-value">{joint.pos.toFixed(0)}°</span>

                    <button
                      className="joint-btn"
                      onClick={() => moveJoint(joint.id, 5)}
                      disabled={!connected || emergencyStop}
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="teleop-card gripper-card">
            <div className="teleop-header">
              <h2 className="card-title">GRIPPER</h2>
              <span className="gripper-value">{gripper}%</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={gripper}
              onChange={handleGripperChange}
              disabled={!connected || emergencyStop}
              className="gripper-slider"
            />

            <div className="gripper-scale">
              <span>OPEN</span>
              <span>CLOSED</span>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Teleop;