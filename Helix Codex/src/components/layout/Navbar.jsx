import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/modules" className={isActive('/modules') ? 'active' : ''}>
          Modules
        </Link>
        <Link to="/dashboard" className={isActive('/dashboard') ? 'active' : ''}>
          Dashboard
        </Link>
        <Link to="/teleop" className={isActive('/teleop') ? 'active' : ''}>
          Terminal
        </Link>
      </div>

      <Link to="/" className="nav-brand">
        helix codex
      </Link>
    </nav>
  );
}