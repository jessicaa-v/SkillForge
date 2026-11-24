import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Lock, User, Briefcase, Sparkles, Compass, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { ForgeMascot } from '../components/ForgeMascot';
import './Login.css';

const Login = () => {
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleDemoFill = () => {
    if (role === 'employee') {
      setEmail('employee@skillforge.com');
      setPassword('employee123');
    } else {
      setEmail('hr@skillforge.com');
      setPassword('hr123');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(role);
    if (role === 'employee') {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="login-realm">
      {/* Decorative Floating Background Sparks */}
      <div className="bg-floating-spark spark-1">⚡</div>
      <div className="bg-floating-spark spark-2">✨</div>
      <div className="bg-floating-spark spark-3">🌟</div>

      <div className="login-dual-card">
        {/* LEFT SHOWCASE COLUMN: BRAND & MASCOT */}
        <div className="login-brand-panel">
          <div className="brand-header-group">
            <div className="login-logo-spark">
              <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="12" fill="url(#loginLogoGrad)" />
                <path d="M14 26L20 12L26 26" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17 21H23" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" />
                <circle cx="28" cy="13" r="3.5" fill="#FFC857" />
                <defs>
                  <linearGradient id="loginLogoGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7656E8" />
                    <stop offset="1" stopColor="#50C9A7" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <span className="brand-wordmark">Skill<span className="wordmark-accent">Forge</span></span>
              <span className="brand-tagline-mini">GAMIFIED LEARNING PLATFORM</span>
            </div>
          </div>

          <div className="login-hero-speech">
            <h1 className="login-pitch-title">
              Forge your skills. <br />
              <span className="gradient-text">Level up your career.</span>
            </h1>
            <p className="login-pitch-desc">
              Transform standard corporate training into an epic learning journey. Conquer RPG modules, collect rare badges, and compete on the global leaderboard.
            </p>
          </div>

          {/* Feature highlights pills */}
          <div className="login-feature-pills">
            <div className="l-feat-pill">
              <Compass size={16} className="text-purple" />
              <span>RPG Course Maps</span>
            </div>
            <div className="l-feat-pill">
              <Sparkles size={16} className="text-gold" />
              <span>Collectible Badges</span>
            </div>
            <div className="l-feat-pill">
              <Zap size={16} className="text-mint" />
              <span>Real-time XP Streaks</span>
            </div>
          </div>

          {/* Sparky Mascot Welcome Hero */}
          <div className="login-mascot-pod">
            <div className="mascot-welcome-bubble">
              <span>"Ready to forge your path, Adventurer?" ⚒️</span>
            </div>
            <ForgeMascot pose="welcome" size={160} />
          </div>
        </div>

        {/* RIGHT LOGIN FORM PANEL */}
        <div className="login-form-panel">
          <div className="form-panel-header">
            <h2 className="form-heading">Welcome Back!</h2>
            <p className="form-subheading">Choose your portal type and enter credentials to continue</p>
          </div>

          {/* TWO LARGE ILLUSTRATED ROLE CARDS */}
          <div className="large-role-selector">
            {/* Employee Card */}
            <div 
              className={`role-select-card ${role === 'employee' ? 'is-selected' : ''}`}
              onClick={() => { setRole('employee'); setEmail(''); setPassword(''); }}
            >
              <div className="role-card-art art-employee">
                <User size={26} />
              </div>
              <div className="role-card-text">
                <span className="role-card-title">Employee Portal</span>
                <span className="role-card-desc">Quests, Leaderboards & XP</span>
              </div>
              {role === 'employee' && (
                <div className="role-active-check">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>

            {/* HR / Admin Card */}
            <div 
              className={`role-select-card ${role === 'hr' ? 'is-selected' : ''}`}
              onClick={() => { setRole('hr'); setEmail(''); setPassword(''); }}
            >
              <div className="role-card-art art-hr">
                <Briefcase size={26} />
              </div>
              <div className="role-card-text">
                <span className="role-card-title">HR & Admin Portal</span>
                <span className="role-card-desc">Analytics, Curricula & Team</span>
              </div>
              {role === 'hr' && (
                <div className="role-active-check">
                  <CheckCircle2 size={16} />
                </div>
              )}
            </div>
          </div>

          {/* Login Form */}
          <form className="login-main-form" onSubmit={handleLogin}>
            <div className="login-input-group">
              <label>Work Email Address</label>
              <div className="input-field-wrap">
                <User size={18} className="field-icon" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === 'employee' ? 'employee@skillforge.com' : 'hr@skillforge.com'}
                  required 
                />
              </div>
            </div>
            
            <div className="login-input-group">
              <label>Password</label>
              <div className="input-field-wrap">
                <Lock size={18} className="field-icon" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required 
                />
              </div>
            </div>

            <div className="login-options-row">
              <label className="custom-check-label">
                <input type="checkbox" defaultChecked /> Remember device
              </label>
              <a href="#" className="forgot-password-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-submit-login">
              Launch {role === 'employee' ? 'Employee Learning Game' : 'HR Admin Dashboard'} <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Credentials Autofill */}
          <div className="quick-demo-box">
            <span className="demo-hint-text">One-click prototype evaluation:</span>
            <button 
              type="button" 
              onClick={handleDemoFill} 
              className="btn btn-secondary btn-demo-fill w-full"
            >
              <Sparkles size={16} className="text-gold" />
              Fill Demo {role === 'employee' ? 'Employee' : 'HR Admin'} Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
