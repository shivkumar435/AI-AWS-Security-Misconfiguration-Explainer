import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

export function FindingsPreview({ findings }) {
  if (!findings || findings.length === 0) {
    return (
      <div className="panel findings-panel">
        <div className="panel-title">
          <div>
            <h2>Security Findings</h2>
            <p>Latest results from your AWS security scan</p>
          </div>
        </div>
        <EmptyState
          icon="◈"
          title="No findings available"
          message="Run a security scan to see findings"
        />
      </div>
    );
  }

  // Sort findings: FAIL findings with higher severity first
  const sortedFindings = [...findings].sort((a, b) => {
    // Status priority: FAIL > PASS
    if (a.status === 'FAIL' && b.status !== 'FAIL') return -1;
    if (a.status !== 'FAIL' && b.status === 'FAIL') return 1;

    // Severity priority: HIGH > MEDIUM > LOW > INFO
    const severityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2, INFO: 3 };
    const severityA = severityOrder[a.severity] ?? 99;
    const severityB = severityOrder[b.severity] ?? 99;

    return severityA - severityB;
  });

  // Show top 6 findings in preview
  const previewFindings = sortedFindings.slice(0, 6);

  return (
    <div className="panel findings-panel">
      <div className="panel-title">
        <div>
          <h2>Security Findings</h2>
          <p>Latest results from your AWS security scan</p>
        </div>
        <button className="view-all">View all ({findings.length}) →</button>
      </div>

      <div className="findings">
        {previewFindings.map((finding, index) => (
          <div className="finding" key={`${finding.rule_id}-${finding.resource_id}-${index}`}>
            <div className={`finding-icon ${finding.status.toLowerCase()}`}>
              {finding.status === "PASS" ? "✓" : "!"}
            </div>

            <div className="finding-info">
              <strong>{finding.rule_id}</strong>
              <span>{finding.service} • {finding.resource_id}</span>
            </div>

            <Badge variant={finding.severity.toLowerCase()}>
              {finding.severity}
            </Badge>

            <span className={`finding-status ${finding.status.toLowerCase()}`}>
              {finding.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
