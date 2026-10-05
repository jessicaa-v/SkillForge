import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Target, 
  Trophy, 
  Medal, 
  FileBadge, 
  Bell, 
  User,
  Settings,
  BarChart3,
  Users,
  LogOut,
  FolderOpen,
  PieChart
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Sidebar.css';

const Sidebar = () => {
  const { state, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isHr = state.user?.role === 'hr';

  const learnerLinks = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/learning', icon: <BookOpen size={20} />, label: 'My Learning' },
    { to: '/challenges', icon: <Target size={20} />, label: 'Challenges' },
    { to: '/leaderboard', icon: <Trophy size={20} />, label: 'Leaderboard' },
    { to: '/achievements', icon: <Medal size={20} />, label: 'Achievements' },
    { to: '/profile', icon: <User size={20} />, label: 'Profile' },
  ];

  const adminLinksOverview = [
    { to: '/admin', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { to: '/admin/analytics', icon: <PieChart size={20} />, label: 'Analytics' },
  ];

  const adminLinksLearning = [
    { to: '/admin/courses', icon: <FolderOpen size={20} />, label: 'Courses' },
    { to: '/admin/challenges', icon: <Target size={20} />, label: 'Challenges' },
  ];

  const adminLinksPeople = [
    { to: '/admin/employees', icon: <Users size={20} />, label: 'Employees' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">S</div>
        <h2>SkillForge</h2>
      </div>
      
      <div className="sidebar-nav">
        {!isHr && (
          <div className="nav-section">
            <p className="nav-label">LEARNING</p>
            {learnerLinks.map(link => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className={({ isActive }) => `nav-link ${isActive && link.to === '/' ? window.location.pathname === '/' ? 'active' : '' : isActive ? 'active' : ''}`}
                end={link.to === '/'}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        )}

        {isHr && (
          <>
            <div className="nav-section">
              <p className="nav-label">OVERVIEW</p>
              {adminLinksOverview.map(link => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={link.to === '/admin'}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="nav-section">
              <p className="nav-label">LEARNING MANAGEMENT</p>
              {adminLinksLearning.map(link => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="nav-section">
              <p className="nav-label">PEOPLE</p>
              {adminLinksPeople.map(link => (
                <NavLink 
                  key={link.to} 
                  to={link.to} 
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className="sidebar-footer">
        {!isHr && state.user && (
          <div className="gamification-status mb-4">
            <div className="status-row">
              <span className="status-label">Total XP</span>
              <span className="status-value highlight-gold">{state.user.xp?.toLocaleString()}</span>
            </div>
            <div className="status-row">
              <span className="status-label">Rank</span>
              <span className="status-value highlight-cyan">#{state.user.rank}</span>
            </div>
          </div>
        )}
        <button className="nav-link w-full text-left flex items-center justify-start text-red-400 hover:bg-red-900 hover:bg-opacity-20" onClick={handleLogout}>
          <LogOut size={20} className="mr-2" style={{color: '#EF4444'}} />
          <span style={{color: '#EF4444', fontWeight: '600'}}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
