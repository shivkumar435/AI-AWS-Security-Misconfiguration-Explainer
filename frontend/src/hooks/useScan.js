import { useState, useCallback, useRef } from 'react';
import { runSecurityScan } from '../services/api';

/**
 * Custom hook for managing AWS security scan state
 * 
 * Lifecycle:
 * - Initial: loading=false, error=null, scanData=null
 * - Starting: loading=true, error=null
 * - Success: loading=false, scanData=response
 * - Failure: loading=false, error=message
 * 
 * @returns {Object} Scan state and control functions
 */
export function useScan() {
  const [scanData, setScanData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scanTimestamp, setScanTimestamp] = useState(null);
  
  // Track if a scan is in progress to prevent duplicates
  const scanInProgressRef = useRef(false);

  /**
   * Validates the scan response structure
   * @param {Object} data - Response data from API
   * @returns {boolean} True if valid
   */
  const validateScanResponse = (data) => {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid scan response: expected an object');
    }

    // Check for required fields
    if (typeof data.risk_score === 'undefined') {
      throw new Error('Invalid scan response: missing risk_score');
    }

    if (!Array.isArray(data.findings)) {
      throw new Error('Invalid scan response: findings must be an array');
    }

    if (typeof data.total_resources === 'undefined') {
      throw new Error('Invalid scan response: missing total_resources');
    }

    return true;
  };

  /**
   * Converts API errors into user-friendly messages
   * @param {Error} error - The error object
   * @returns {string} User-friendly error message
   */
  const getErrorMessage = (error) => {
    const message = error.message || 'Unknown error occurred';

    // Network/connection errors
    if (message.includes('Backend unavailable') || 
        message.includes('Failed to fetch') ||
        message.includes('NetworkError')) {
      return 'Backend unavailable. Please ensure the server is running at http://127.0.0.1:8000';
    }

    // HTTP status errors
    if (message.includes('HTTP 400')) {
      return 'Bad request: The server could not process the scan request';
    }

    if (message.includes('HTTP 401')) {
      return 'Unauthorized: Authentication required';
    }

    if (message.includes('HTTP 403')) {
      return 'Forbidden: You do not have permission to run scans';
    }

    if (message.includes('HTTP 404')) {
      return 'Not found: The scan endpoint does not exist';
    }

    if (message.includes('HTTP 500') || message.includes('HTTP 5')) {
      return 'Server error: The backend encountered an internal error';
    }

    // Timeout errors
    if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
      return 'Request timeout: The scan took too long to complete';
    }

    // Invalid response errors
    if (message.includes('Invalid response') || 
        message.includes('Expected JSON') ||
        message.includes('Invalid scan response')) {
      return message;
    }

    // Connection refused
    if (message.includes('ECONNREFUSED')) {
      return 'Connection refused: Backend server is not running';
    }

    // Default: return the original message
    return message;
  };

  /**
   * Runs the AWS security scan
   * Prevents duplicate requests while scan is in progress
   */
  const runScan = useCallback(async () => {
    // Prevent duplicate scan requests
    if (scanInProgressRef.current) {
      console.warn('Scan already in progress, ignoring duplicate request');
      return;
    }

    // Mark scan as in progress
    scanInProgressRef.current = true;

    // Update state: start scanning
    setLoading(true);
    setError(null);

    try {
      // Call the API
      const data = await runSecurityScan();

      // Validate response structure
      validateScanResponse(data);

      // Update state: scan successful
      setScanData(data);
      setScanTimestamp(new Date());
      setError(null);

    } catch (err) {
      console.error('Scan failed:', err);

      // Update state: scan failed
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setScanData(null);

    } finally {
      // Update state: scan complete
      setLoading(false);
      scanInProgressRef.current = false;
    }
  }, []);

  /**
   * Clears the error state
   * Useful for dismissing error banners
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * Resets all scan state
   * Useful for clearing the dashboard
   */
  const resetScan = useCallback(() => {
    setScanData(null);
    setError(null);
    setLoading(false);
    setScanTimestamp(null);
    scanInProgressRef.current = false;
  }, []);

  return {
    // State
    scanData,
    loading,
    error,
    scanTimestamp,
    
    // Actions
    runScan,
    clearError,
    resetScan,
  };
}
