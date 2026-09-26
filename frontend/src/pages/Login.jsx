import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Mock frontend success state
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      
      <div className="panel" style={{ width: '100%', maxWidth: '420px', padding: '35px 30px' }}>
        <div className="logo" style={{ padding: '0 0 25px 0', justifyContent: 'center' }}>
          <div className="logo-icon">⌁</div>
          <div>
            <h2>SentinelAI</h2>
            <span>AWS Security Explainer</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <h1 style={{ fontSize: '22px', margin: '0 0 5px 0' }}>Welcome Back</h1>
          <p style={{ color: '#68758b', fontSize: '12px', margin: 0 }}>Sign in to manage your AWS security posture.</p>
        </div>

        {error && (
          <div style={{ background: '#3a1d21', color: '#ff727d', border: '1px solid rgba(255,114,125,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '18px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ⚠ {error}
          </div>
        )}

        {success && (
          <div style={{ background: '#14251e', color: '#53d997', border: '1px solid rgba(83,217,151,0.3)', padding: '12px', borderRadius: '8px', marginBottom: '18px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✓ Login successful! Redirecting to dashboard...
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <label style={{ fontSize: '11px', color: '#8d9aae', fontWeight: 500, letterSpacing: '0.5px' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              style={{
                background: '#111822',
                border: '1px solid #202b3a',
                padding: '12px 14px',
                borderRadius: '8px',
                color: '#e8edf7',
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3474ef'}
              onBlur={(e) => e.target.style.borderColor = '#202b3a'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '11px', color: '#8d9aae', fontWeight: 500, letterSpacing: '0.5px' }}>PASSWORD</label>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#609eff', fontSize: '11px', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  background: '#111822',
                  border: '1px solid #202b3a',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  color: '#e8edf7',
                  fontSize: '13px',
                  width: '100%',
                  paddingRight: '60px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3474ef'}
                onBlur={(e) => e.target.style.borderColor = '#202b3a'}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  background: 'none',
                  border: 'none',
                  color: '#8d9aae',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: '4px',
                  fontWeight: 500
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#8d9aae', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: '#2563eb', width: '14px', height: '14px', cursor: 'pointer' }} />
              Remember me for 30 days
            </label>
          </div>

          <button type="submit" className="scan-button" style={{ marginTop: '5px', padding: '14px', fontSize: '13px', letterSpacing: '0.5px' }} disabled={success}>
            {success ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
