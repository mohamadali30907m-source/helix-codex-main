import "./PrimaryButton.css";
function PrimaryButton({ label = "Action", onClick, disabled = false }) {
  return (
    <button
      className="primary-button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="btn-glow" />
      <span className="btn-label">{label}</span>
    </button>
  );
}

export default PrimaryButton;