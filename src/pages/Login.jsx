import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Lock, User, Briefcase } from 'lucide-react';
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
    <div className="login-page">
      <div className="login-container card">
        <div className="login-header text-center">
          <div className="logo-icon-large mx-auto mb-4">S</div>
          <h1 className="login-title">SKILLFORGE</h1>
          <p className="login-subtitle">Level up your skills. Build your future.</p>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn ${role === 'employee' ? 'active' : ''}`}
            onClick={() => { setRole('employee'); setEmail(''); setPassword(''); }}
            type="button"
          >
            <User size={18} /> Employee
          </button>
          <button 
            className={`role-btn ${role === 'hr' ? 'active' : ''}`}
            onClick={() => { setRole('hr'); setEmail(''); setPassword(''); }}
            type="button"
          >
            <Briefcase size={18} /> HR / Admin
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'employee' ? 'employee@skillforge.com' : 'hr@skillforge.com'}
                required 
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required 
              />
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary login-submit-btn w-full mt-4">
            Login as {role === 'employee' ? 'Employee' : 'HR / Admin'}
          </button>
        </form>

        <div className="demo-credentials mt-6 text-center">
          <p className="text-sm text-muted mb-2">For prototype evaluation:</p>
          <button onClick={handleDemoFill} className="btn btn-secondary text-sm">
            Fill Demo {role === 'employee' ? 'Employee' : 'HR'} Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
