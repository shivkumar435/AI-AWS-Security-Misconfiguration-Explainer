function FindingsPreview({ findings }) {
  return (
    <div className="panel findings-panel">
      <div className="panel-title">
        <div>
          <h2>Security Findings</h2>
          <p>Latest results from your AWS security scan</p>
        </div>
        <button className="view-all">View all →</button>
      </div>

      <div className="findings">
        {findings.map((finding, index) => (
          <div className="finding" key={finding.id || index}>
            <div className={`finding-icon ${finding.status?.toLowerCase() || 'fail'}`}>
              {finding.status === "PASS" ? "✓" : "!"}
            </div>

            <div className="finding-info">
              <strong>{finding.name || finding.message}</strong>
              <span>{finding.service} security check</span>
            </div>

            <span className={`severity ${finding.severity?.toLowerCase() || 'info'}`}>
              {finding.severity || "INFO"}
            </span>

            <span className="finding-score">
              +{finding.score || finding.risk_score || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindingsPreview;
