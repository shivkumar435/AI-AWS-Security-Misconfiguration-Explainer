import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";

function FindingDetail() {
  const { id } = useParams();
  const [finding, setFinding] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchFinding();
  }, [id]);

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
          </div>

          <div className="ai-message" style={{ minHeight: '100px', paddingTop: '20px' }}>
            {finding.ai_explanation ? (
              <div style={{ color: '#e8edf7', fontSize: '14px', lineHeight: '1.6' }}>
                <div style={{ marginBottom: '15px' }}>
                  <span className="label" style={{ display: 'block', marginBottom: '4px' }}>WHAT IS WRONG</span>
                  <p style={{ margin: 0 }}>{finding.ai_explanation.what_is_wrong}</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span className="label" style={{ display: 'block', marginBottom: '4px' }}>WHY IT MATTERS</span>
                  <p style={{ margin: 0 }}>{finding.ai_explanation.why_it_matters}</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span className="label" style={{ display: 'block', marginBottom: '4px' }}>SECURITY IMPACT</span>
                  <p style={{ margin: 0 }}>{finding.ai_explanation.security_impact}</p>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <span className="label" style={{ display: 'block', marginBottom: '4px' }}>BLAST RADIUS</span>
                  <p style={{ margin: 0 }}>{finding.ai_explanation.blast_radius}</p>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <span className="label" style={{ display: 'block', marginBottom: '4px' }}>REMEDIATION STEPS</span>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {finding.ai_explanation.remediation_steps && finding.ai_explanation.remediation_steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ display: 'flex', gap: '30px', marginTop: '20px', borderTop: '1px solid #1c2738', paddingTop: '15px' }}>
                  <div>
                    <span className="label">PRIORITY</span>
                    <strong style={{ display: 'block', marginTop: '4px' }}>{finding.ai_explanation.priority}</strong>
                  </div>
                  <div>
                    <span className="label">CONFIDENCE</span>
                    <strong style={{ display: 'block', marginTop: '4px', textTransform: 'capitalize' }}>{finding.ai_explanation.confidence}</strong>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#68778d' }}>
                AI explanation not available yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FindingDetail;
