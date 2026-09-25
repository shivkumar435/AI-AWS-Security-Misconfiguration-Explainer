import './LoadingOverlay.css';

export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="loading-overlay" role="alert" aria-live="polite" aria-busy="true">
      <div className="loading-overlay-content">
        <div className="loading-spinner-large">
          <div className="spinner"></div>
        </div>
        <p className="loading-overlay-message">{message}</p>
      </div>
    </div>
  );
}
