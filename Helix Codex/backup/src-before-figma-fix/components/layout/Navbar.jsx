import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isOnline = true, version = "1.0" }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <span className="brand-icon">◈</span>
        <span className="brand-text">HELIX CODEX</span>
      </div>

      <div className="nav-center">
        <span className={`status-pill ${isOnline ? "online" : "offline"}`}>
          <span className="status-dot" />
          {isOnline ? "ONLINE" : "OFFLINE"}
        </span>
        <span className="version-tag">v{version}</span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link active">Home</Link>
        <Link to="/modules" className="nav-link">Modules</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/teleop" className="nav-link">Control</Link>
      </div>
    </nav>
  );
}

export default Navbar;