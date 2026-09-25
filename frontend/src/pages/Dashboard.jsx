import { useState } from "react";

const findingsMock = [
  {
    name: "IAM MFA Disabled",
    service: "IAM",
    severity: "HIGH",
    score: 10,
    status: "FAIL",
  },
  {
    name: "S3 Versioning Disabled",
    service: "S3",
    severity: "MEDIUM",
    score: 4,
    status: "FAIL",
  },
  {
    name: "S3 Logging Disabled",
    service: "S3",
    severity: "MEDIUM",
    score: 3,
    status: "FAIL",
  },
  {
    name: "IAM Access Key Risk",
    service: "IAM",
    severity: "MEDIUM",
    score: 2,
    status: "FAIL",
  },
  {
    name: "S3 Public Access",
    service: "S3",
    severity: "PASS",
    score: 0,
    status: "PASS",
  },
  {
    name: "S3 Encryption",
    service: "S3",
    severity: "PASS",
    score: 0,
    status: "PASS",
  },
];

function Dashboard() {
  const [scanData, setScanData] = useState(null);
  const [scanning, setScanning] = useState(false);

  const runScan = async () => {
    setScanning(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/scan", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = await response.json();
      setScanData(data);
    } catch (error) {
      console.error(error);
      alert("Failed to run AWS scan");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">SECURITY CENTER</p>
          <h1>AWS Security Overview</h1>
        </div>

        <button
          className="scan-button"
          onClick={runScan}
          disabled={scanning}
        >
          {scanning ? "Scanning..." : "↻ Run Security Scan"}
        </button>
      </header>

      <section className="account-bar">
        <div>
          <span className="label">AWS ACCOUNT</span>
          <strong>Default AWS Account</strong>
        </div>

        <div>
          <span className="label">REGION</span>
          <strong>eu-north-1</strong>
        </div>

        <div>
          <span className="label">LAST SCAN</span>
          <strong>Just now</strong>
        </div>

        <div className="status">
          <span className="dot"></span>
          Connected
        </div>
      </section>

      <section className="stats">
        <div className="stat-card risk-card">
          <div className="stat-header">
            <span>RISK SCORE</span>
            <span className="icon">◉</span>
          </div>

          <div className="risk-number">
            {scanData ? scanData.risk_score : "19"}
          </div>

          <p>Low overall risk</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>FAILED CHECKS</span>
            <span className="icon">⚠</span>
          </div>
          <div className="stat-number">
            {scanData
              ? scanData.findings.filter((f) => f.status === "FAIL").length
              : "4"}
          </div>
          <p>Require attention</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>PASSED CHECKS</span>
            <span className="icon">✓</span>
          </div>
          <div className="stat-number">3</div>
          <p>Security controls passed</p>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span>RESOURCES</span>
            <span className="icon">◈</span>
          </div>
          <div className="stat-number">
            {scanData ? scanData.total_resources : "--"}
          </div>
          <p>AWS resources scanned</p>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel findings-panel">
          <div className="panel-title">
            <div>
              <h2>Security Findings</h2>
              <p>Latest results from your AWS security scan</p>
            </div>
            <button className="view-all">View all →</button>
          </div>

          <div className="findings">
            {findingsMock.map((finding, index) => (
              <div className="finding" key={index}>
                <div className={`finding-icon ${finding.status.toLowerCase()}`}>
                  {finding.status === "PASS" ? "✓" : "!"}
                </div>

                <div className="finding-info">
                  <strong>{finding.name}</strong>
                  <span>{finding.service} security check</span>
                </div>

                <span className={`severity ${finding.severity.toLowerCase()}`}>
                  {finding.severity}
                </span>

                <span className="finding-score">
                  +{finding.score}
                </span>
              </div>
            ))}
          </div>
        </div>

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
      </section>

      <section className="bottom-grid">
        <div className="panel">
          <div className="panel-title">
            <div>
              <h2>Security Status</h2>
              <p>Current AWS security posture</p>
            </div>
          </div>

          <div className="security-status">
            <div className="status-circle">
              <strong>81%</strong>
              <span>Secure</span>
            </div>

            <div className="status-details">
              <div>
                <span><i className="green"></i> Passed</span>
                <strong>3</strong>
              </div>
              <div>
                <span><i className="red"></i> Failed</span>
                <strong>4</strong>
              </div>
              <div>
                <span><i className="yellow"></i> Warnings</span>
                <strong>0</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">
            <div>
              <h2>AI Assistant</h2>
              <p>Ask questions about your AWS security</p>
            </div>
          </div>

          <div className="suggestions">
            <button>Is my AWS account secure?</button>
            <button>What should I fix first?</button>
            <button>Explain my highest risk</button>
            <button>How can I reduce my risk score?</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
