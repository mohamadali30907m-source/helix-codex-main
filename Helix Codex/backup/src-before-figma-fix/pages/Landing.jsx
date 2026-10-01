import Navbar from "../components/layout/Navbar";
import DNAViewer from "../components/ui/DNAViewer";
import PrimaryButton from "../components/ui/PrimaryButton";
import "./Landing.css";

function Landing({ 
  isOnline = true, 
  version = "1.0", 
  coreStatus = "ACTIVE", 
  onInitialize 
}) {
  return (
    <div className="landing-page">
      <Navbar isOnline={isOnline} version={version} />

      <main className="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <DNAViewer status={coreStatus} />

          <header className="hero-header">
            <h1 id="hero-title" className="hero-title">HELIX CODEX</h1>
            <p className="hero-subtitle">DECODE • EVOLVE • MASTER</p>
          </header>

          <div className="cta-wrapper">
            <PrimaryButton 
              label="Initialize Node" 
              onClick={onInitialize}
              disabled={!isOnline}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;
