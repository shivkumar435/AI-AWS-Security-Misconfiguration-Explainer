function EmptyState({ message = "No data found.", subMessage = "" }) {
  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#8a96a9', backgroundColor: '#111822', borderRadius: '8px', border: '1px solid #202b3a' }}>
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>📭</div>
      <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{message}</p>
      {subMessage && <p style={{ fontSize: '14px', marginTop: '5px' }}>{subMessage}</p>}
    </div>
  );
}

export default EmptyState;
