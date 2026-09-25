import { StatCard } from './StatCard';

export function RiskScoreCard({ riskScore }) {
  const getRiskDescription = (score) => {
    if (score === null || score === undefined) return 'No scan data';
    if (score === 0) return 'No security issues detected';
    if (score < 20) return 'Low overall risk';
    if (score < 50) return 'Moderate security risk';
    if (score < 80) return 'High security risk';
    return 'Critical security risk';
  };

  return (
    <StatCard
      title="RISK SCORE"
      value={riskScore}
      description={getRiskDescription(riskScore)}
      icon="◉"
      variant="risk"
    />
  );
}
