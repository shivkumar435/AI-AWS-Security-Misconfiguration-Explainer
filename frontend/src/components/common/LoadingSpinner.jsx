function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: '#8a96a9' }}>
      <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#53d997', borderRadius: '50%', animation: 'spin 1s ease-in-out infinite' }} />
      <p style={{ marginTop: '10px' }}>{message}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;
