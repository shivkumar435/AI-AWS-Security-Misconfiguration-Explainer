function ErrorMessage({ message = "An error occurred." }) {
  return (
    <div style={{ padding: '20px', backgroundColor: 'rgba(255, 112, 124, 0.1)', color: '#ff707c', borderLeft: '4px solid #ff707c', borderRadius: '4px' }}>
      <strong>Error: </strong> {message}
    </div>
  );
}

export default ErrorMessage;
