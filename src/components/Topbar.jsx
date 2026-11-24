import { Search, Bell, Flame, Sparkles, Award, Menu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Topbar.css';

const Topbar = ({ onToggleSidebar }) => {
  const { state } = useAppContext();
  
  if (!state.user) return null;
  const currentUser = state.user;
  const isHr = currentUser.role === 'hr';

  return (
    <header className="topbar">
      <div className="topbar-left">
        {onToggleSidebar && (
          <button className="mobile-menu-btn" onClick={onToggleSidebar} title="Toggle Navigation">
            <Menu size={22} />
          </button>
        )}

        {/* Search Input */}
        <div className="search-container">
          <Search className="search-icon" size={19} />
          <input 
            type="text" 
            placeholder={isHr ? "Search employees, courses, analytics..." : "Search quests, courses, skills, colleagues..."} 
            className="search-input"
          />
          <span className="search-shortcut">⌘K</span>
        </div>
      </div>

      {/* Gamification Pills & Profile */}
      <div className="topbar-right">
        {!isHr && (
          <div className="gamification-pills">
            {/* Streak Counter Pill */}
            <div className="game-pill pill-streak" title={`${currentUser.streak}-day learning streak!`}>
              <div className="pill-icon-box flame-glow">
                <Flame size={18} className="flame-icon" />
              </div>
              <div className="pill-content">
                <span className="pill-val">{currentUser.streak}</span>
                <span className="pill-lbl">STREAK</span>
              </div>
            </div>

            {/* Total XP Pill */}
            <div className="game-pill pill-xp" title={`${currentUser.xp?.toLocaleString()} Total XP`}>
              <div className="pill-icon-box xp-glow">
                <Sparkles size={16} />
              </div>
              <div className="pill-content">
                <span className="pill-val">{currentUser.xp?.toLocaleString()}</span>
                <span className="pill-lbl">XP</span>
              </div>
            </div>

            {/* Level Pill */}
            <div className="game-pill pill-level" title={`Level ${currentUser.level} ${currentUser.title}`}>
              <div className="pill-icon-box level-glow">
                <Award size={17} />
              </div>
              <div className="pill-content">
                <span className="pill-val">LVL {currentUser.level}</span>
              </div>
            </div>
          </div>
        )}

        {/* Notifications */}
        <button className="icon-btn notification-btn" title="Notifications">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        {/* Profile Card */}
        <div className="user-profile-badge">
          <img 
            src={`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.name?.split(' ')[1] || ''}&background=7656E8&color=fff&bold=true`} 
            alt={currentUser.name} 
            className="avatar-topbar" 
          />
          <div className="profile-text-info">
            <span className="profile-user-name">{currentUser.firstName || currentUser.name}</span>
            <span className="profile-user-dept">{isHr ? 'HR Admin' : (currentUser.department || 'Learner')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
