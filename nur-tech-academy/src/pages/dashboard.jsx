import Navbar from "../components/layout/Navbar";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <Navbar isOnline={true} version="1.0.0" />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">SYSTEM DASHBOARD</h1>
          <p className="page-subtitle">Telemetry & Control Interface</p>
        </section>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h3 className="card-title">ROBOT STATUS</h3>
            <div className="status-display">
              <span className="status-indicator online" />
              <span className="status-text">ONLINE — LIVE</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Voltage</span>
              <span className="metric-value">12.0 V</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Current</span>
              <span className="metric-value">0.5 A</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">Joints</span>
              <span className="metric-value">4 Active</span>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="card-title">TELEMETRY</h3>
            <div className="telemetry-log">
              <div className="log-line">
                <span className="log-time">19:30:01</span>
                <span className="log-msg">System initialized</span>
              </div>
              <div className="log-line">
                <span className="log-time">19:30:02</span>
                <span className="log-msg">Mimo connected</span>
              </div>
              <div className="log-line">
                <span className="log-time">19:30:03</span>
                <span className="log-msg">Telemetry streaming at 30Hz</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card wide">
            <h3 className="card-title">JOINT POSITIONS</h3>
            <div className="joints-list">
              {[
                { id: "LS", name: "Left Shoulder", angle: 0 },
                { id: "LA", name: "Left Arm", angle: 15 },
                { id: "RS", name: "Right Shoulder", angle: 30 },
                { id: "RA", name: "Right Arm", angle: 45 },
              ].map((joint) => (
                <div key={joint.id} className="joint-row">
                  <span className="joint-id">{joint.id}</span>
                  <span className="joint-name">{joint.name}</span>
                  <div className="joint-bar-track">
                    <div
                      className="joint-bar-fill"
                      style={{ width: `${((joint.angle + 90) / 180) * 100}%` }}
                    />
                  </div>
                  <span className="joint-angle">{joint.angle.toFixed(1)}°</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;