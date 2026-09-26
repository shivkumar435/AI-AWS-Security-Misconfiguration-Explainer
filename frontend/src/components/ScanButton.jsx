function ScanButton({ scanning, runScan }) {
  return (
    <button
      className="scan-button"
      onClick={runScan}
      disabled={scanning}
    >
      {scanning ? "Scanning..." : "↻ Run Security Scan"}
    </button>
  );
}

export default ScanButton;
