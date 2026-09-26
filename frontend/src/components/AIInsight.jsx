function AIInsight() {
  return (
    <div className="panel ai-panel">
      <div className="ai-header">
        <div className="ai-symbol">✦</div>
        <div>
          <h2>AI Security Insight</h2>
          <span>Powered by AI reasoning</span>
        </div>
      </div>

      <div className="ai-message">
        <span className="ai-label">MOST IMPORTANT ISSUE</span>

        <h3>IAM MFA is disabled</h3>

        <p>
          Your IAM user has MFA disabled. Combined with an active
          access key, this increases the risk of unauthorized access.
        </p>

        <div className="ai-recommendation">
          <span>AI RECOMMENDATION</span>
          <strong>Enable MFA for the affected IAM user.</strong>
        </div>
      </div>

      <button className="chat-button">
        ✦ Ask AI Security Agent
      </button>
    </div>
  );
}

export default AIInsight;
