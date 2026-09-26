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
        <Link to="/resources" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${location.pathname.startsWith('/resources') ? 'active' : ''}`}>▣ Resources</div>
        </Link>
        <Link to="/agent" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${location.pathname.startsWith('/agent') ? 'active' : ''}`}>✦ AI Security Agent</div>
        </Link>
        <Link to="/reports" style={{ textDecoration: 'none' }}>
          <div className={`nav-item ${location.pathname.startsWith('/reports') ? 'active' : ''}`}>▤ Reports</div>
        </Link>
      </nav>

      <div className="sidebar-bottom">
        <div className="connection">
          <span className="dot"></span>
          AWS Connected
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <small>Scanner v1.0</small>
          <Link to="/login" style={{ color: '#609eff', fontSize: '11px', textDecoration: 'none' }}>Login</Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
