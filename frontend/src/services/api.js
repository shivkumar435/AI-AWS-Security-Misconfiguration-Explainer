/**
 * Centralized API service for backend communication
 * All API calls should go through this service
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || 
        errorData.message || 
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Parse JSON response
    const data = await response.json();
    return data;
    
  } catch (error) {
    // Network errors, invalid JSON, or thrown errors from above
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Backend unavailable. Please ensure the server is running.', { cause: error });
    }
    
    if (error instanceof SyntaxError) {
      throw new Error('Invalid response from server. Expected JSON.', { cause: error });
    }
    
    // Re-throw the error with context
    throw error;
  }
}

/**
 * Check backend health status
 * @returns {Promise<{status: string}>}
 */
export async function checkHealth() {
  return fetchAPI('/health');
}

/**
 * Run AWS security scan
 * @returns {Promise<Object>} Scan results with findings, risk score, and resources
 */
export async function runSecurityScan() {
  return fetchAPI('/scan', {
    method: 'POST',
  });
}
