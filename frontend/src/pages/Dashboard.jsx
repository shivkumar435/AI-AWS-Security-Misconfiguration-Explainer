import { useState } from "react";
import RiskScoreCard from "../components/RiskScoreCard";
import StatCard from "../components/StatCard";
import FindingsDistribution from "../components/FindingsDistribution";
import ScanButton from "../components/ScanButton";
import FindingsPreview from "../components/FindingsPreview";
import AIInsight from "../components/AIInsight";
import SecurityStatus from "../components/SecurityStatus";

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

  const currentFindings = scanData ? scanData.findings : findingsMock;
  const failedChecks = currentFindings.filter((f) => f.status === "FAIL").length;
  const passedChecks = currentFindings.filter((f) => f.status === "PASS").length;

  return (
    <div className="main">
      <header className="topbar">
        <div>
          <p className="eyebrow">SECURITY CENTER</p>
          <h1>AWS Security Overview</h1>
        </div>

        <ScanButton scanning={scanning} runScan={runScan} />
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
          <strong>{scanData ? "Just now" : "Pending"}</strong>
        </div>

        <div className="status">
          <span className="dot"></span>
          Connected
        </div>
      </section>

      <section className="stats">
        <RiskScoreCard riskScore={scanData ? scanData.risk_score : 19} />
        
        <StatCard
          title="FAILED CHECKS"
          icon="⚠"
          value={failedChecks}
          description="Require attention"
        />

        <StatCard
          title="PASSED CHECKS"
          icon="✓"
          value={passedChecks}
          description="Security controls passed"
        />

        <StatCard
          title="RESOURCES"
          icon="◈"
          value={scanData ? scanData.total_resources : "--"}
          description="AWS resources scanned"
        />

        <FindingsDistribution findings={currentFindings} />
      </section>

      <section className="content-grid">
        <FindingsPreview findings={currentFindings} />
        <AIInsight />
      </section>

      <section className="bottom-grid">
        <SecurityStatus passed={passedChecks} failed={failedChecks} />

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
