import React from "react";
import { useNavigate } from "react-router-dom";
import DNAViewer from "../components/ui/DNAViewer";
import PrimaryButton from "../components/ui/PrimaryButton";
import "./Landing.css";

function Landing({ 
  isOnline = true, 
  version = "1.0", 
  coreStatus = "ACTIVE", 
  onInitialize 
}) {
  const navigate = useNavigate();
  const handleStart = () => {
    if (onInitialize) onInitialize();
    navigate('/modules');
  };

  return (
    <div className="landing-page">
      
      <main className="main-content">
        <section className="hero-section">
          <DNAViewer status={coreStatus} />

          <header className="hero-header">
            <h1 className="hero-title">Helix Codex</h1>
            <p className="hero-subtitle">
              <span className="tag-decode">DECODE</span>
              <span className="tag-dot"> </span>
              <span className="tag-evolve">EVOLVE</span>
              <span className="tag-dot"> </span>
              <span className="tag-master">MASTER</span>
            </p>
          </header>

          <div className="cta-wrapper">
            <PrimaryButton 
              onClick={handleStart}
              disabled={!isOnline}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;