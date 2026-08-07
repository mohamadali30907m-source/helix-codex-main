import Spline from '@splinetool/react-spline';

function DNAViewer({ status = "ACTIVE" }) {
  return (
    <div className="visualizer-wrapper">
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/HhPetSmCrYYuQPgD/scene.splinecode" />
      </div>
      <div className="hud-overlay">
        <span className="hud-label">CORE_STATUS // {status}</span>
      </div>
    </div>
  );
}

export default DNAViewer;