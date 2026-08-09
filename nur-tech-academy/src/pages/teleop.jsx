import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import "./Teleop.css";

const INITIAL_JOINTS = [
  { id: "LS", name: "LEFT SHOULDER", pos: 0 },
  { id: "LA", name: "LEFT ARM", pos: 0 },
  { id: "RS", name: "RIGHT SHOULDER", pos: 0 },
  { id: "RA", name: "RIGHT ARM", pos: 0 },
];

function Teleop() {
  const [connected, setConnected] = useState(false);
  const [joints, setJoints] = useState(INITIAL_JOINTS);
  const [gripper, setGripper] = useState(0);

  const moveJoint = (id, delta) => {
    if (!connected) return;

    setJoints((current) =>
      current.map((joint) =>
        joint.id === id
          ? {
              ...joint,
              pos: Math.max(-90, Math.min(90, joint.pos + delta)),
            }
          : joint
      )
    );
  };

  const handleConnect = () => {
    setConnected((current) => !current);
  };

  const handleHome = () => {
    if (!connected) return;

    setJoints((current) =>
      current.map((joint) => ({
        ...joint,
        pos: 0,
      }))
    );

    setGripper(0);
  };
  const handleEmergencyStop = () => {
   setConnected(false);
  };

  return (
    <div className="teleop-page">
      <Navbar />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">TELEOPERATION</h1>
          <p className="page-subtitle">
            Mimo Remote Control Interface
          </p>
        </section>

        <section className="teleop-layout">
          <aside className="teleop-card connection-card">
            <div className="teleop-header">
              <h2 className="card-title">CONNECTION</h2>

              <span
                className={`conn-badge ${
                  connected ? "online" : "offline"
                }`}
              >
                {connected ? "CONNECTED" : "OFFLINE"}
              </span>
            </div>

            <div className="connection-status">
              <span
                className={`status-dot ${
                  connected ? "active" : ""
                }`}
              />

              <span>
                {connected
                  ? "Mimo control link active"
                  : "Mimo control link inactive"}
              </span>
            </div>

            <button
              className={`teleop-btn ${
                connected ? "disconnect" : "connect"
              }`}
              onClick={handleConnect}
            >
              {connected ? "Disconnect" : "Connect to Mimo"}
            </button>

            <button
              className="teleop-btn home"
              onClick={handleHome}
              disabled={!connected}
            >
              Home Position
            </button>

            <button
              className="teleop-btn estop"
              onClick={handleEmergencyStop}
            >
              Emergency Stop
            </button>
          </aside>

          <section className="teleop-card robot-card">
            <div className="teleop-header">
              <div>
                <h2 className="card-title">MIMO</h2>
                <p className="robot-description">
                  Virtual robotic control model
                </p>
              </div>

              <span className="robot-indicator">
                {connected ? "READY" : "STANDBY"}
              </span>
            </div>

            <div className="robot-preview">
              <div className="robot-placeholder">
                <span>MIMO</span>
                <small>3D ROBOT VIEW</small>
              </div>
            </div>
          </section>

          <aside className="teleop-card status-card">
            <h2 className="card-title">SYSTEM STATUS</h2>

            <div className="status-list">
              <div className="status-row">
                <span>CONNECTION</span>
                <strong className={connected ? "green" : "muted"}>
                  {connected ? "ONLINE" : "OFFLINE"}
                </strong>
              </div>

              <div className="status-row">
                <span>SERVO SYSTEM</span>
                <strong className={connected ? "green" : "muted"}>
                  {connected ? "ACTIVE" : "IDLE"}
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
            </div>
          </aside>

          <section className="teleop-card joint-card">
            <div className="teleop-header">
              <div>
                <h2 className="card-title">JOINT CONTROL</h2>
                <p className="section-description">
                  Four-axis Mimo arm control
                </p>
              </div>
            </div>
            <div className="joint-controls">
              {joints.map((joint) => {
                const percentage = ((joint.pos + 90) / 180) * 100;

                return (
                  <div className="joint-control-row" key={joint.id}>
                    <div className="joint-name">
                      <span className="joint-id">{joint.id}</span>
                      <span className="joint-label">
                        {joint.name}
                      </span>
                    </div>

                    <button
                      className="joint-btn"
                      onClick={() => moveJoint(joint.id, -5)}
                      disabled={!connected}
                      aria-label={`Decrease ${joint.name}`}
                    >
                      −
                    </button>

                    <div className="joint-bar-track">
                      <div
                        className={`joint-bar-fill ${
                          connected ? "active" : ""
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                      <div
                        className="joint-center-mark"
                        aria-hidden="true"
                      />
                    </div>

                    <span className="joint-value">
                      {joint.pos.toFixed(0)}°
                    </span>

                    <button
                      className="joint-btn"
                      onClick={() => moveJoint(joint.id, 5)}
                      disabled={!connected}
                      aria-label={`Increase ${joint.name}`}
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

              <span className="gripper-value">
                {gripper}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={gripper}
              onChange={(event) =>
                setGripper(Number(event.target.value))
              }
              disabled={!connected}
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