import { EmptyState } from '../common/EmptyState';

export function FindingsDistribution({ findings }) {
  if (!findings || findings.length === 0) {
    return (
      <div className="panel">
        <div className="panel-title">
          <div>
            <h2>Findings Distribution</h2>
            <p>Breakdown by severity and service</p>
          </div>
        </div>
        <EmptyState
          icon="📊"
          title="No distribution data"
          message="Run a scan to see findings distribution"
        />
      </div>
    );
  }

  // Count by severity
  const severityCounts = findings.reduce((acc, finding) => {
    const severity = finding.severity || 'UNKNOWN';
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {});

  // Count by service
  const serviceCounts = findings.reduce((acc, finding) => {
    const service = finding.service?.toUpperCase() || 'UNKNOWN';
    acc[service] = (acc[service] || 0) + 1;
    return acc;
  }, {});

  // Calculate percentages for visualization
  const total = findings.length;

  const severityData = [
    { label: 'High', count: severityCounts.HIGH || 0, color: '#ff727d' },
    { label: 'Medium', count: severityCounts.MEDIUM || 0, color: '#e9bb56' },
    { label: 'Low', count: severityCounts.LOW || 0, color: '#5da3ff' },
    { label: 'Info', count: severityCounts.INFO || 0, color: '#55d79a' },
  ].filter(item => item.count > 0);

  const serviceData = Object.entries(serviceCounts)
    .map(([service, count]) => ({ label: service, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5 services

  return (
    <div className="panel">
      <div className="panel-title">
        <div>
          <h2>Findings Distribution</h2>
          <p>Breakdown by severity and service</p>
        </div>
      </div>

      <div className="distribution-grid">
        {/* Severity Distribution */}
        <div className="distribution-section">
          <h3 className="distribution-subtitle">By Severity</h3>
          <div className="distribution-bars">
            {severityData.map((item) => {
              const percentage = (item.count / total) * 100;
              return (
                <div key={item.label} className="distribution-bar-row">
                  <span className="distribution-label">{item.label}</span>
                  <div className="distribution-bar-container">
                    <div
                      className="distribution-bar"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${item.label} severity: ${item.count} findings, ${percentage.toFixed(0)}%`}
                    />
                  </div>
                  <span className="distribution-count">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Service Distribution */}
        <div className="distribution-section">
          <h3 className="distribution-subtitle">By Service</h3>
          <div className="distribution-bars">
            {serviceData.map((item) => {
              const percentage = (item.count / total) * 100;
              return (
                <div key={item.label} className="distribution-bar-row">
                  <span className="distribution-label">{item.label}</span>
                  <div className="distribution-bar-container">
                    <div
                      className="distribution-bar distribution-bar-service"
                      style={{ width: `${percentage}%` }}
                      role="progressbar"
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-label={`${item.label} service: ${item.count} findings, ${percentage.toFixed(0)}%`}
                    />
                  </div>
                  <span className="distribution-count">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
