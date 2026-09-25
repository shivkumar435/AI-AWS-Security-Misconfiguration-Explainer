import { useScan } from '../hooks/useScan';
import { ScanButton } from '../components/dashboard/ScanButton';
import { RiskScoreCard } from '../components/dashboard/RiskScoreCard';
import { StatCard } from '../components/dashboard/StatCard';
import { FindingsPreview } from '../components/dashboard/FindingsPreview';
import { AIInsight } from '../components/dashboard/AIInsight';
import { SecurityStatus } from '../components/dashboard/SecurityStatus';
import { FindingsDistribution } from '../components/dashboard/FindingsDistribution';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingOverlay } from '../components/common/LoadingOverlay';

/**
 * Formats a Date to a short human-readable string.
 * Returns "N/A" if the date is falsy.
 */
function formatTimestamp(date) {
  if (!date) return 'N/A';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
       + ' · '
       + date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export function Dashboard() {
  const { scanData, loading, error, scanTimestamp, runScan, clearError } = useScan();

  // Extract data from scan response
  const riskScore = scanData?.risk_score;
  const totalResources = scanData?.total_resources;
  const totalFindings = scanData?.total_findings;
  const findings = scanData?.findings || [];

  // Calculate passed and failed checks from findings
  const failedCount = findings.filter(f => f.status === 'FAIL').length;
  const passedCount = findings.filter(f => f.status === 'PASS').length;

  return (
    <main className="main">
      {/* Loading overlay when scan is in progress */}
      {loading && (
        <LoadingOverlay message="Scanning your AWS environment…" />
      )}

      <header className="topbar">
        <div>
          <p className="eyebrow">Security Center</p>
          <h1>AWS Security Overview</h1>
        </div>

        <ScanButton 
          onClick={runScan} 
          loading={loading}
          aria-label={loading ? 'Scan in progress' : 'Run AWS security scan'}
        />
      </header>

      {/* Error banner */}
      {error && (
        <ErrorMessage 
          error={error} 
          onRetry={runScan} 
          onDismiss={clearError}
        />
      )}

      {/* Empty state — first-time user */}
      {!scanData && !loading && !error && (
        <EmptyState
          icon="◈"
          title="No scan data available"
          message="Click 'Run Security Scan' to analyze your AWS environment for security misconfigurations."
          action={
            <ScanButton 
              onClick={runScan} 
              loading={loading}
              aria-label="Start your first security scan"
            />
          }
        />
      )}

      {/* Dashboard content — only shown when we have scan data */}
      {scanData && (
        <>
          {/* Scan metadata bar */}
          <section className="account-bar" role="region" aria-label="Scan information">
            <div>
              <span className="label">Scan ID</span>
              <strong title={scanData.scan_id}>
                {scanData.scan_id?.substring(0, 8) || 'N/A'}
              </strong>
            </div>

            <div>
              <span className="label">Total Findings</span>
              <strong>{totalFindings !== undefined ? totalFindings : '--'}</strong>
            </div>

            <div>
              <span className="label">Last Scan</span>
              <strong>{formatTimestamp(scanTimestamp)}</strong>
            </div>

            <div className="status">
              <span className="dot" role="status" aria-label="Scan complete"></span>
              Scan Complete
            </div>
          </section>

          {/* Statistics cards */}
          <section className="stats" role="region" aria-label="Security statistics">
            <RiskScoreCard riskScore={riskScore} />

            <StatCard
              title="FAILED CHECKS"
              value={failedCount}
              description="Require attention"
              icon="⚠"
            />

            <StatCard
              title="PASSED CHECKS"
              value={passedCount}
              description="Security controls passed"
              icon="✓"
            />

            <StatCard
              title="RESOURCES"
              value={totalResources}
              description="AWS resources scanned"
              icon="◈"
            />
          </section>

          {/* Main content grid */}
          <section className="content-grid">
            <FindingsPreview findings={findings} />
            <AIInsight findings={findings} />
          </section>

          {/* Analytics and distribution */}
          <section className="bottom-grid">
            <FindingsDistribution findings={findings} />
            <SecurityStatus findings={findings} />
          </section>

          {/* AI Assistant suggestions */}
          <section className="bottom-grid">
            <div className="panel">
              <div className="panel-title">
                <div>
                  <h2>AI Assistant</h2>
                  <p>Ask questions about your AWS security</p>
                </div>
              </div>

              <div className="suggestions">
                <button aria-label="Ask: Is my AWS account secure?">
                  Is my AWS account secure?
                </button>
                <button aria-label="Ask: What should I fix first?">
                  What should I fix first?
                </button>
                <button aria-label="Ask: Explain my highest risk">
                  Explain my highest risk
                </button>
                <button aria-label="Ask: How can I reduce my risk score?">
                  How can I reduce my risk score?
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
