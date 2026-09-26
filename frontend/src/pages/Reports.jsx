import { useState, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";

function Reports() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchScans = async () => {
      setLoading(true);
      try {
        // This endpoint is not yet implemented on the backend, 
        // but we structure it to consume it when ready.
        const response = await fetch(`http://127.0.0.1:8000/scans`);
        if (!response.ok) throw new Error("Failed to fetch scans");
        
        const data = await response.json();
        setScans(data);
      } catch (error) {
        console.error(error);
        // Fallback/clear data on error since backend isn't ready
        setScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">SECURITY CENTER</p>
          <h1>Scan History & Reports</h1>
        </div>
      </header>

      <section className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="panel findings-panel">
          <div className="panel-title">
            <div>
              <h2>Past Scans</h2>
              <p>{scans.length} scans found</p>
            </div>
          </div>

          <div className="findings">
            {loading ? <LoadingSpinner message="Loading scan history..." /> : scans.map((scan) => (
              <div className="finding" key={scan.id}>
                <div className="finding-icon pass">
                  ▤
                </div>

                <div className="finding-info">
                  <strong>{formatDate(scan.started_at)}</strong>
                  <span>{scan.status} | Resources: {scan.total_resources} | Findings: {scan.total_findings}</span>
                </div>
                
                <span className="finding-score" style={{ color: scan.total_risk_score > 50 ? '#ff707c' : scan.total_risk_score > 20 ? '#f0c674' : '#53d997' }}>
                  Risk Score: {scan.total_risk_score}
                </span>
              </div>
            ))}
            {!loading && scans.length === 0 && (
              <EmptyState 
                message="No scan history found." 
                subMessage="The backend endpoint is currently unavailable or no scans have been run." 
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Reports;
