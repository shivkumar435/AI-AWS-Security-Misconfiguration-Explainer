import { EmptyState } from '../common/EmptyState';

export function SecurityStatus({ findings }) {
  if (!findings || findings.length === 0) {
    return (
      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Security Status</h2>
            <p>Current AWS security posture</p>
          </div>
        </div>
        <EmptyState
          icon="◈"
          title="No status available"
          message="Run a security scan to see your security status"
        />
      </div>
    );
  }

  const passedCount = findings.filter(f => f.status === 'PASS').length;
  const failedCount = findings.filter(f => f.status === 'FAIL').length;
  const totalCount = findings.length;

  // Calculate security percentage based on passed vs total findings
  // Formula: (passed findings / total findings) * 100
  const securityPercentage = totalCount > 0 
    ? Math.round((passedCount / totalCount) * 100) 
    : 0;

  // Count warnings (findings with status other than PASS/FAIL)
  const warningCount = findings.filter(
    f => f.status !== 'PASS' && f.status !== 'FAIL'
  ).length;

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
          <strong>{securityPercentage}%</strong>
          <span>Secure</span>
        </div>

        <div className="status-details">
          <div>
            <span><i className="green"></i> Passed</span>
            <strong>{passedCount}</strong>
          </div>
          <div>
            <span><i className="red"></i> Failed</span>
            <strong>{failedCount}</strong>
          </div>
          <div>
            <span><i className="yellow"></i> Warnings</span>
            <strong>{warningCount}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
