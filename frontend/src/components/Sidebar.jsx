import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">⌁</div>
        <div>
          <h2>SentinelAI</h2>
          <span>AWS Security</span>
        </div>
      </div>

      <nav>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>◈ Dashboard</div>
        </Link>
        <Link to="/findings" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${location.pathname.startsWith('/findings') ? 'active' : ''}`}>⚠ Findings</div>
        </Link>
        <div className="nav-item">▣ Resources</div>
        <div className="nav-item">✦ AI Security Agent</div>
        <div className="nav-item">▤ Reports</div>
      </nav>

      <div className="sidebar-bottom">
        <div className="connection">
          <span className="dot"></span>
          AWS Connected
        </div>
        <small>Scanner v1.0</small>
      </div>
    </aside>
  );
}

export default Sidebar;
