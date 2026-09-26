function StatCard({ title, icon, value, description }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span>{title}</span>
        <span className="icon">{icon}</span>
      </div>
      <div className="stat-number">{value}</div>
      <p>{description}</p>
    </div>
  );
}

export default StatCard;
