function RiskScoreCard({ riskScore }) {
  return (
    <div className="stat-card risk-card">
      <div className="stat-header">
        <span>RISK SCORE</span>
        <span className="icon">◉</span>
      </div>
      <div className="risk-number">{riskScore}</div>
      <p>{riskScore > 50 ? "High overall risk" : riskScore > 20 ? "Medium overall risk" : "Low overall risk"}</p>
    </div>
  );
}

export default RiskScoreCard;
