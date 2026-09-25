export function StatCard({ title, value, description, icon, variant }) {
  return (
    <div className={`stat-card ${variant ? `stat-card-${variant}` : ''}`}>
      <div className="stat-header">
        <span>{title}</span>
        {icon && <span className="icon">{icon}</span>}
      </div>
      <div className={variant === 'risk' ? 'risk-number' : 'stat-number'}>
        {value !== null && value !== undefined ? value : '--'}
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
