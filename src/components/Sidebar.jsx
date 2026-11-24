import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Target,
  Trophy,
  Medal,
  User,
  BarChart3,
  Users,
  LogOut,
  FolderOpen,
  PieChart,
  Sparkles,
  Flame,
  Coins,
  FileBadge,
  MessageSquare
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from './ForgeMascot';
import './Sidebar.css';

const Sidebar = ({ isOpen = false, onClose }) => {
  const { state, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (onClose) onClose();
  };

  const isHr = state.user?.role === 'hr';

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const learnerLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/learning', icon: <BookOpen size={20} />, label: 'My Learning' },
    { to: '/challenges', icon: <Target size={20} />, label: 'Quests & Quizzes' },
    { to: '/certificates', icon: <FileBadge size={20} />, label: 'Certificates' },
    { to: '/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
    { to: '/achievements', icon: <Medal size={20} />, label: 'Achievements' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile & Skills' },
  ];

  const adminLinksOverview = [
    { to: '/admin', icon: <BarChart3 size={20} />, label: 'HR Analytics' },
    { to: '/admin/analytics', icon: <PieChart size={20} />, label: 'Reports' },
  ];

  const adminLinksLearning = [
    { to: '/admin/courses', icon: <FolderOpen size={20} />, label: 'Courses' },
    { to: '/admin/feedback', icon: <MessageSquare size={20} />, label: 'Course Feedback' },
    { to: '/admin/challenges', icon: <Target size={20} />, label: 'Challenges' },
  ];

  const adminLinksPeople = [
    { to: '/admin/employees', icon: <Users size={20} />, label: 'Employees' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-logo">
        <div className="logo-spark">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="12" fill="url(#logoG)" />
            <path d="M14 26L20 12L26 26" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 21H23" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" />
            <circle cx="28" cy="13" r="3" fill="#FFC857" />
            <defs>
              <linearGradient id="logoG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7656E8" />
                <stop offset="1" stopColor="#50C9A7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="logo-text-group">
          <h2 className="brand-name">Skill<span className="brand-accent">Forge</span></h2>
          <span className="brand-badge">{isHr ? 'HR PORTAL' : 'LEARNER GAME'}</span>
        </div>
        {onClose && (
          <button className="mobile-close-btn" onClick={onClose} title="Close navigation">
            ✕
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav">
        {!isHr && (
          <div className="nav-section">
            <p className="nav-label">LEARNING QUESTS</p>
            {learnerLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={handleLinkClick}
                className={({ isActive }) => `nav-link ${isActive && link.to === '/' ? window.location.pathname === '/' ? 'active' : '' : isActive ? 'active' : ''}`}
                end={link.to === '/'}
              >
                <div className="nav-icon-wrapper">
                  {link.icon}
                </div>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {isHr && (
          <>
            <div className="nav-section">
              <p className="nav-label">HR OVERVIEW</p>
              {adminLinksOverview.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={link.to === '/admin'}
                >
                  <div className="nav-icon-wrapper">{link.icon}</div>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="nav-section">
              <p className="nav-label">CURRICULUM</p>
              {adminLinksLearning.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-icon-wrapper">{link.icon}</div>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="nav-section">
              <p className="nav-label">TEAM DIRECTORY</p>
              {adminLinksPeople.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <div className="nav-icon-wrapper">{link.icon}</div>
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Sidebar Footer Gamification Widget */}
      <div className="sidebar-footer">
        {!isHr && state.user && (
          <div className="gamification-widget">
            <div className="widget-header">
              <div className="widget-mascot">
                <ForgeMascot pose="welcome" size={38} />
              </div>
              <div>
                <span className="widget-name">{state.user.firstName || 'Alex'}</span>
                <span className="widget-tier">Lvl {state.user.level} {state.user.title || 'Explorer'}</span>
              </div>
            </div>

            <div className="widget-stats-grid">
              <div className="widget-stat-item">
                <span className="widget-stat-label"><Sparkles size={13} className="text-purple" /> Total XP</span>
                <span className="widget-stat-val text-purple">{state.user.xp?.toLocaleString()}</span>
              </div>
              <div className="widget-stat-item">
                <span className="widget-stat-label"><Flame size={13} className="text-coral" /> Streak</span>
                <span className="widget-stat-val text-coral">{state.user.streak} Days</span>
              </div>
              <div className="widget-stat-item">
                <span className="widget-stat-label"><Coins size={13} className="text-gold" /> Coins</span>
                <span className="widget-stat-val text-gold">{state.user.coins?.toLocaleString() || '1,450'}</span>
              </div>
              <div className="widget-stat-item">
                <span className="widget-stat-label"><Trophy size={13} className="text-mint" /> Rank</span>
                <span className="widget-stat-val text-mint">#{state.user.rank}</span>
              </div>
            </div>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
