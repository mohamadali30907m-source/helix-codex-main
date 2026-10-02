import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ version = "1.0.0" }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          <span className="brand-accent">Helix Codex</span> // v{version}
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/" className={isActive('/') ? 'active' : ''}>[ Home ]</Link>
        <Link to="/modules" className={isActive('/modules') ? 'active' : ''}>[ Modules ]</Link>
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>[ Dashboard ]</Link>
        <Link to="/teleop" className={isActive('/teleop') ? 'active' : ''}>[ Terminal ]</Link>
      </div>
    </nav>
  );
}

export default Navbar;