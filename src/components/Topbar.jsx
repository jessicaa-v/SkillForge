import { Search, Bell, Flame } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Topbar.css';

const Topbar = () => {
  const { state } = useAppContext();
  
  // For HR user or unauthenticated
  if (!state.user) return null;
  const currentUser = state.user;

  return (
    <header className="topbar">
      <div className="search-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search courses, skills, colleagues..." 
          className="search-input"
        />
      </div>

      <div className="topbar-right">
        {currentUser.role !== 'hr' && (
          <>
            <div className="streak-badge">
              <Flame size={18} className="flame-icon" />
              <span className="streak-count">{currentUser.streak}</span>
            </div>

            <div className="xp-badge">
              <span className="xp-star">⭐</span>
              <span className="xp-amount">{currentUser.xp?.toLocaleString()} XP</span>
            </div>

            <div className="level-badge">
              <span className="level-text">Lvl {currentUser.level}</span>
            </div>
          </>
        )}

        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-dropdown">
          <img 
            src={`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.name.split(' ')[1]}&background=6366F1&color=fff`} 
            alt="Profile" 
            className="avatar" 
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
