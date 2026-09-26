function SecurityStatus({ passed, failed }) {
  const total = passed + failed;
  const percentage = total === 0 ? 100 : Math.round((passed / total) * 100);

  return (
    <div className="panel">
      <div className="panel-title">
        <div>
          <h2>Security Status</h2>
          <p>Current AWS security posture</p>
        </div>
      </div>

      <div className="security-status">
        <div className="status-circle">
          <strong>{percentage}%</strong>
          <span>Secure</span>
        </div>

        <div className="status-details">
          <div>
            <span><i className="green"></i> Passed</span>
            <strong>{passed}</strong>
          </div>
          <div>
            <span><i className="red"></i> Failed</span>
            <strong>{failed}</strong>
          </div>
          <div>
            <span><i className="yellow"></i> Warnings</span>
            <strong>0</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityStatus;
