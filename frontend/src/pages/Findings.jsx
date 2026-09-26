import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";

function Findings() {
  const [findings, setFindings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterService, setFilterService] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchFindings();
  }, [filterService, filterSeverity, filterStatus]);

  const fetchFindings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterService) params.append("service", filterService);
      if (filterSeverity) params.append("severity", filterSeverity);
      if (filterStatus) params.append("status", filterStatus);

      const response = await fetch(`http://127.0.0.1:8000/findings?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch findings");
      
      const data = await response.json();
      setFindings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">SECURITY CENTER</p>
          <h1>All Findings</h1>
        </div>
      </header>

      <section className="account-bar" style={{ gap: '20px' }}>
        <div>
          <span className="label">FILTER BY SERVICE</span>
          <select value={filterService} onChange={(e) => setFilterService(e.target.value)} style={{ background: '#111822', color: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #202b3a' }}>
            <option value="">All Services</option>
            <option value="IAM">IAM</option>
            <option value="S3">S3</option>
            <option value="EC2">EC2</option>
          </select>
        </div>

        <div>
          <span className="label">FILTER BY SEVERITY</span>
          <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)} style={{ background: '#111822', color: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #202b3a' }}>
            <option value="">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="INFO">Info</option>
          </select>
        </div>

        <div>
          <span className="label">FILTER BY STATUS</span>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ background: '#111822', color: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #202b3a' }}>
            <option value="">All Statuses</option>
            <option value="FAIL">Fail</option>
            <option value="PASS">Pass</option>
          </select>
        </div>
      </section>

      <section className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="panel findings-panel">
          <div className="panel-title">
            <div>
              <h2>Security Findings</h2>
              <p>{findings.length} results found</p>
            </div>
          </div>

          <div className="findings">
            {loading ? <LoadingSpinner message="Loading findings..." /> : findings.map((finding) => (
              <Link to={`/findings/${finding.id}`} key={finding.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="finding" style={{ cursor: 'pointer' }}>
                  <div className={`finding-icon ${finding.status.toLowerCase()}`}>
                    {finding.status === "PASS" ? "✓" : "!"}
                  </div>

                  <div className="finding-info">
                    <strong>{finding.message}</strong>
                    <span>{finding.service} | {finding.resource_id}</span>
                  </div>

                  <span className={`severity ${finding.severity.toLowerCase()}`}>
                    {finding.severity}
                  </span>

                  <span className="finding-score">
                    +{finding.risk_score}
                  </span>
                </div>
              </Link>
            ))}
            {!loading && findings.length === 0 && (
              <EmptyState 
                message="No findings match your criteria." 
                subMessage="Try adjusting your filters to see more results." 
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Findings;
