import { useState, useEffect } from "react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { EmptyState } from "../components/common/EmptyState";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filterService, setFilterService] = useState("");
  const [filterRegion, setFilterRegion] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (filterService) params.append("service", filterService);
        if (filterRegion) params.append("region", filterRegion);

        // This endpoint is not yet implemented on the backend, 
        // but we structure it to consume it when ready.
        const response = await fetch(`http://127.0.0.1:8000/resources?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch resources");
        
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error(error);
        // Fallback/clear data on error since backend isn't ready
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [filterService, filterRegion]);

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">SECURITY CENTER</p>
          <h1>Scanned Resources</h1>
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
          <span className="label">FILTER BY REGION</span>
          <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)} style={{ background: '#111822', color: '#fff', padding: '5px', borderRadius: '5px', border: '1px solid #202b3a' }}>
            <option value="">All Regions</option>
            <option value="us-east-1">us-east-1</option>
            <option value="us-west-2">us-west-2</option>
            <option value="eu-central-1">eu-central-1</option>
            <option value="global">global</option>
          </select>
        </div>
      </section>

      <section className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
        <div className="panel findings-panel">
          <div className="panel-title">
            <div>
              <h2>Resources Inventory</h2>
              <p>{resources.length} resources found</p>
            </div>
          </div>

          <div className="findings">
            {loading ? <LoadingSpinner message="Loading resources..." /> : resources.map((resource) => (
              <div className="finding" key={resource.id}>
                <div className="finding-icon pass">
                  ▣
                </div>

                <div className="finding-info">
                  <strong>{resource.resource_id}</strong>
                  <span>{resource.service} | {resource.region || "global"}</span>
                </div>
                
                {resource.status && (
                  <span className={`finding-score`} style={{ color: resource.status === 'PASS' ? '#53d997' : '#ff707c' }}>
                    {resource.status}
                  </span>
                )}
              </div>
            ))}
            {!loading && resources.length === 0 && (
              <EmptyState 
                message="No resources to display." 
                subMessage="The backend endpoint is currently unavailable or your filters resulted in no matches." 
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;
