import './ErrorMessage.css';

export function ErrorMessage({ error, onRetry, onDismiss }) {
  if (!error) return null;

  return (
    <div className="error-banner">
      <div className="error-content">
        <span className="error-icon">⚠</span>
        <span>{error}</span>
      </div>
      <div className="error-actions">
        {onRetry && (
          <button className="error-retry" onClick={onRetry}>
            Try Again
          </button>
        )}
        {onDismiss && (
          <button className="error-dismiss" onClick={onDismiss}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
