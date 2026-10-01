import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ isOnline = true, version = "1.0" }) {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        Helix Codex // v{version}
      </div>

      <div className="nav-links">
        <Link to="/modules">[ Modules ]</Link>
        <Link to="/dashboard">[ Dashboard ]</Link>
        <Link to="/teleop">[ Terminal ]</Link>
      </div>
    </nav>
  );
}

export default Navbar;