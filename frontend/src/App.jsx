import "./App.css";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">⌁</div>
          <div>
            <h2>SentinelAI</h2>
            <span>AWS Security</span>
          </div>
        </div>

        <nav>
          <div className="nav-item active">◈ Dashboard</div>
          <div className="nav-item">⚠ Findings</div>
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

      <Dashboard />
    </div>
  );
}

export default App;