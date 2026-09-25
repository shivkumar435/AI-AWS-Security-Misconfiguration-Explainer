export function ScanButton({ onClick, loading, disabled, 'aria-label': ariaLabel }) {
  return (
    <button
      className="scan-button"
      onClick={onClick}
      disabled={loading || disabled}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? "Scanning..." : "↻ Run Security Scan"}
    </button>
  );
}
