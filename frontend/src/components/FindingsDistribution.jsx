function FindingsDistribution({ findings }) {
  const distribution = findings.reduce(
    (acc, f) => {
      const severity = f.severity?.toUpperCase();
      if (severity === "CRITICAL") acc.critical++;
      else if (severity === "HIGH") acc.high++;
      else if (severity === "MEDIUM") acc.medium++;
      else if (severity === "LOW") acc.low++;
      else acc.info++;
      return acc;
    },
    { critical: 0, high: 0, medium: 0, low: 0, info: 0 }
  );

  return (
    <div className="stat-card">
      <div className="stat-header">
        <span>SEVERITY DISTRIBUTION</span>
        <span className="icon">📊</span>
      </div>
      <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff4d4d' }}>
          <span>Critical:</span> <strong>{distribution.critical}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff707c' }}>
          <span>High:</span> <strong>{distribution.high}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ffc859' }}>
          <span>Medium:</span> <strong>{distribution.medium}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8a96a9' }}>
          <span>Low:</span> <strong>{distribution.low}</strong>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4e8fdc' }}>
          <span>Info:</span> <strong>{distribution.info}</strong>
        </div>
      </div>
    </div>
  );
}

export default FindingsDistribution;
