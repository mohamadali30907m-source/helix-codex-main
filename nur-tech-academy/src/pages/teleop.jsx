import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import "./Teleop.css";

function Teleop() {
  const [connected, setConnected] = useState(false);
  const [joints, setJoints] = useState([
    { id: "J1", pos: 0 },
    { id: "J2", pos: 0 },
    { id: "J3", pos: 0 },
    { id: "J4", pos: 0 },
    { id: "J5", pos: 0 },
    { id: "J6", pos: 0 },
  ]);

  const moveJoint = (id, delta) => {
    setJoints((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, pos: Math.max(-180, Math.min(180, j.pos + delta)) } : j
      )
    );
  };

  const handleConnect = () => {
    setConnected(!connected);
  };

  const handleHome = () => {
    setJoints((prev) => prev.map((j) => ({ ...j, pos: 0 })));
  };

  const handleEStop = () => {
    setConnected(false);
    setJoints((prev) => prev.map((j) => ({ ...j, pos: j.pos })));
  };

  return (
    <div className="teleop-page">
      <Navbar isOnline={connected} version="1.0.0" />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">TELEOPERATION</h1>
          <p className="page-subtitle">Manual Robot Control Interface</p>
        </section>

        <section className="teleop-grid">
          <div className="teleop-card">
            <div className="teleop-header">
              <h3 className="card-title">CONNECTION</h3>
              <span className={`conn-badge ${connected ? "online" : "offline"}`}>
                {connected ? "CONNECTED" : "DISCONNECTED"}
              </span>
            </div>
            <button
              className={`teleop-btn ${connected ? "disconnect" : "connect"}`}
              onClick={handleConnect}
            >
              {connected ? "Disconnect" : "Connect to Robot"}
            </button>
            <button className="teleop-btn home" onClick={handleHome} disabled={!connected}>
              Home All Joints
            </button>
            <button className="teleop-btn estop" onClick={handleEStop}>
              EMERGENCY STOP
            </button>
          </div>

          <div className="teleop-card wide">
            <h3 className="card-title">JOINT CONTROL</h3>
            <div className="joint-controls">
              {joints.map((j) => (
                <div key={j.id} className="joint-control-row">
                  <span className="joint-label">{j.id}</span>
                  <button
                    className="joint-btn"
                    onClick={() => moveJoint(j.id, -10)}
                    disabled={!connected}
                  >
                    −
                  </button>
                  <div className="joint-bar-track">
                    <div
                      className="joint-bar-fill"
                      style={{
                        width: `${((j.pos + 180) / 360) * 100}%`,
                        background: connected ? "#39FF14" : "#555",
                      }}
                    />
                  </div>
                  <span className="joint-value">{j.pos.toFixed(1)}°</span>
                  <button
                    className="joint-btn"
                    onClick={() => moveJoint(j.id, 10)}
                    disabled={!connected}
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="teleop-card">
            <h3 className="card-title">END EFFECTOR</h3>
            <div className="ee-controls">
              <div className="ee-row">
                <span className="ee-label">X</span>
                <span className="ee-value">0.00</span>
              </div>
              <div className="ee-row">
                <span className="ee-label">Y</span>
                <span className="ee-value">0.00</span>
              </div>
              <div className="ee-row">
                <span className="ee-label">Z</span>
                <span className="ee-value">0.00</span>
              </div>
              <div className="ee-row">
                <span className="ee-label">GRIPPER</span>
                <input type="range" min="0" max="100" defaultValue="0" className="gripper-slider" disabled={!connected} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Teleop;