import "./PrimaryButton.css";

function PrimaryButton({ onClick, disabled = false }) {
  return (
    <button
      className="express-btn"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-glow" />
      <span className="btn-text">EXPRESS</span>
    </button>
  );
}

export default PrimaryButton;