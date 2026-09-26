import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

function FindingDetail() {
  const { id } = useParams();
  const [finding, setFinding] = useState(null);
  const [loading, setLoading] = useState(true);

  // AI Explanation States
  const [aiExplanation, setAiExplanation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    fetchFinding();
  }, [id]);

  const fetchFinding = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/findings/${id}`);
      if (!response.ok) throw new Error("Failed to fetch finding");
      
      const data = await response.json();
      setFinding(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExplainWithAI = async () => {
    setAiLoading(true);
    setAiError(null);
    try {
      // Simulate API call delay for the UI testing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Connect to real backend AI endpoint when available
      // const response = await fetch(`http://127.0.0.1:8000/findings/${id}/explain`, { method: 'POST' });
      // if (!response.ok) throw new Error("Failed to generate AI explanation");
      // const data = await response.json();
      // setAiExplanation(data.explanation);

      setAiExplanation("This is a placeholder AI explanation. It will be replaced with real AI-generated analysis once the backend endpoint is implemented. The issue indicates a security misconfiguration that should be reviewed according to AWS best practices.");
    } catch (error) {
      console.error(error);
      setAiError("Failed to generate AI explanation.");
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) return <div className="main"><LoadingSpinner message="Loading finding details..." /></div>;
  if (!finding) return <div className="main"><EmptyState message="Finding not found." /></div>;

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">
            <Link to="/findings" style={{ color: '#4e8fdc', textDecoration: 'none' }}>← BACK TO FINDINGS</Link>
          </p>
          <h1 style={{ marginTop: '8px' }}>{finding.message}</h1>
        </div>
      </header>

      <section className="account-bar" style={{ gap: '40px' }}>
        <div>
          <span className="label">SERVICE</span>
          <strong>{finding.service}</strong>
        </div>
        <div>
          <span className="label">RESOURCE ID</span>
          <strong>{finding.resource_id}</strong>
        </div>
        <div>
          <span className="label">SEVERITY</span>
          <span className={`severity ${finding.severity.toLowerCase()}`} style={{ display: 'inline-block', marginTop: '5px' }}>
            {finding.severity}
          </span>
        </div>
        <div>
          <span className="label">STATUS</span>
          <strong style={{ color: finding.status === 'PASS' ? '#53d997' : '#ff707c', marginTop: '5px', display: 'inline-block' }}>
            {finding.status}
          </strong>
        </div>
        <div>
          <span className="label">RISK SCORE</span>
          <strong style={{ color: '#57d69a', marginTop: '5px', display: 'inline-block' }}>+{finding.risk_score}</strong>
        </div>
      </section>

      <section className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="panel">
          <div className="panel-title">
            <div>
              <h2>Details</h2>
            </div>
          </div>
          <div className="ai-message" style={{ paddingTop: 0 }}>
             <p style={{ color: '#e8edf7', fontSize: '14px', marginBottom: '20px' }}>{finding.description || "No description available for this finding."}</p>
             
             {finding.remediation && (
               <div className="ai-recommendation">
                  <span>REMEDIATION</span>
                  <strong style={{ color: '#e8edf7' }}>{finding.remediation}</strong>
               </div>
             )}
          </div>
        </div>

        {/* AI Explanation Section */}
        <div className="panel ai-panel" style={{ marginTop: '20px' }}>
          <div className="ai-header" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="ai-symbol">✦</div>
            <div>
              <h2>AI Explanation</h2>
              <span>Deep security analysis</span>
            </div>
            {!aiExplanation && !aiLoading && (
              <button className="chat-button" onClick={handleExplainWithAI} style={{ marginLeft: 'auto', cursor: 'pointer' }}>
                ✦ Explain with AI
              </button>
            )}
          </div>

          <div className="ai-message" style={{ minHeight: '100px', paddingTop: '20px' }}>
            {aiLoading ? (
              <LoadingSpinner message="Generating AI analysis..." />
            ) : aiError ? (
              <div style={{ color: '#ff707c', padding: '20px 0', textAlign: 'center' }}>
                {aiError} <br/>
                <button 
                  onClick={handleExplainWithAI} 
                  style={{ marginTop: '10px', background: 'transparent', border: '1px solid #ff707c', color: '#ff707c', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Retry
                </button>
              </div>
            ) : aiExplanation ? (
              <p style={{ color: '#e8edf7', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                {aiExplanation}
              </p>
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#68778d' }}>
                Click the button above to generate a detailed AI analysis of this finding.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FindingDetail;
