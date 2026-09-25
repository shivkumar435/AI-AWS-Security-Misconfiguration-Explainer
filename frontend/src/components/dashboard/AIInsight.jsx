import { EmptyState } from '../common/EmptyState';

export function AIInsight({ findings }) {
  // AI insights are not provided by the backend yet
  // We'll show the highest priority finding instead
  
  if (!findings || findings.length === 0) {
    return (
      <div className="panel ai-panel">
        <div className="ai-header">
          <div className="ai-symbol">✦</div>
          <div>
            <h2>AI Security Insight</h2>
            <span>Powered by AI reasoning</span>
          </div>
        </div>
        <EmptyState
          icon="✦"
          title="No insights available"
          message="Run a security scan to get AI-powered recommendations"
        />
      </div>
    );
  }

  // Find the highest priority failed finding
  const failedFindings = findings.filter(f => f.status === 'FAIL');
  
  if (failedFindings.length === 0) {
    return (
      <div className="panel ai-panel">
        <div className="ai-header">
          <div className="ai-symbol">✦</div>
          <div>
            <h2>AI Security Insight</h2>
            <span>Powered by AI reasoning</span>
          </div>
        </div>
        <EmptyState
          icon="✓"
          title="No critical issues detected"
          message="Your AWS environment passed all security checks"
        />
        <button className="chat-button">
          ✦ Ask AI Security Agent
        </button>
      </div>
    );
  }

  // Sort by severity: HIGH > MEDIUM > LOW
  const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2, INFO: 3 };
  const topFinding = failedFindings.sort((a, b) => {
    return (severityOrder[a.severity] ?? 99) - (severityOrder[b.severity] ?? 99);
  })[0];

  return (
    <div className="panel ai-panel">
      <div className="ai-header">
        <div className="ai-symbol">✦</div>
        <div>
          <h2>AI Security Insight</h2>
          <span>Powered by AI reasoning</span>
        </div>
      </div>

      <div className="ai-message">
        <span className="ai-label">MOST IMPORTANT ISSUE</span>

        <h3>{topFinding.rule_id.replace(/_/g, ' ')}</h3>

        <p>{topFinding.message}</p>

        <div className="ai-recommendation">
          <span>AFFECTED RESOURCE</span>
          <strong>{topFinding.service.toUpperCase()} • {topFinding.resource_id}</strong>
        </div>

        <div className="ai-severity-badge">
          <span className={`severity ${topFinding.severity.toLowerCase()}`}>
            {topFinding.severity} SEVERITY
          </span>
        </div>
      </div>

      <button className="chat-button">
        ✦ Ask AI Security Agent
      </button>
    </div>
  );
}
