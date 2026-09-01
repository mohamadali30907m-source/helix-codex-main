import heroImg from "../../export-2026-09-01 035523.svg";
import "./DNAViewer.css";

function DNAViewer({ status = "ACTIVE" }) {
  return (
    <div className="dna-wrapper">
      <div className="dna-inner">
        <img 
          src={heroImg} 
          alt="Helix Codex Science Illustration" 
          className="hero-custom-img" 
        />
      </div>
      <div className="dna-hud">CORE_STATUS // {status}</div>
    </div>
  );
}

export default DNAViewer;