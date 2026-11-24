import { useState } from 'react';
import { Medal, Trophy, Crown, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import './Leaderboard.css';

const Leaderboard = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('Global');
  const leaderboardData = state.leaderboard || [];
  const currentUser = state.user || {};

  const top3 = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <div className="leaderboard-realm animate-slide-up">
      {/* Header */}
      <div className="leaderboard-header text-center">
        <div className="header-pill mx-auto">
          <Trophy size={14} className="text-gold" /> HALL OF MASTERS
        </div>
        <h1 className="leaderboard-title">Global Leaderboard</h1>
        <p className="leaderboard-subtitle">Compete with fellow explorers, climb the ranks, and earn prestige medals.</p>
      </div>

      {/* Tabs */}
      <div className="leaderboard-tabs-bar">
        {['Global', 'Department', 'Weekly', 'Monthly'].map(tab => (
          <button 
            key={tab} 
            className={`l-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* GRAND PODIUM SECTION */}
      <div className="grand-podium-showcase">
        {/* 2nd Place: Silver */}
        {top3[1] && (
          <div className="podium-pedestal silver card-hover">
            <div className="pedestal-medal-tag silver-tag">
              <Medal size={16} /> 2nd Place
            </div>
            <div className="pedestal-avatar-box border-silver">
              <span className="avatar-initials">{top3[1].avatar}</span>
            </div>
            <h3 className="pedestal-user-name">{top3[1].name}</h3>
            <span className="pedestal-dept-tag">{top3[1].department}</span>
            <span className="pedestal-lvl-tag">Level {top3[1].level}</span>
            <div className="pedestal-xp-pill silver-xp">
              <Sparkles size={14} /> {top3[1].xp.toLocaleString()} XP
            </div>
            <div className="pedestal-base base-silver">
              <span className="base-rank-num">2</span>
            </div>
          </div>
        )}

        {/* 1st Place: Gold */}
        {top3[0] && (
          <div className="podium-pedestal gold card-hover">
            <div className="podium-crown-floating">
              <Crown size={38} fill="#FFC857" color="#D97706" />
            </div>
            <div className="pedestal-medal-tag gold-tag">
              <Crown size={16} /> 1st Champion
            </div>
            <div className="pedestal-avatar-box border-gold">
              <span className="avatar-initials">{top3[0].avatar}</span>
            </div>
            <h3 className="pedestal-user-name">{top3[0].name}</h3>
            <span className="pedestal-dept-tag">{top3[0].department}</span>
            <span className="pedestal-lvl-tag">Level {top3[0].level}</span>
            <div className="pedestal-xp-pill gold-xp">
              <Sparkles size={14} /> {top3[0].xp.toLocaleString()} XP
            </div>
            <div className="pedestal-base base-gold">
              <span className="base-rank-num">1</span>
            </div>
          </div>
        )}

        {/* 3rd Place: Bronze */}
        {top3[2] && (
          <div className="podium-pedestal bronze card-hover">
            <div className="pedestal-medal-tag bronze-tag">
              <Medal size={16} /> 3rd Place
            </div>
            <div className="pedestal-avatar-box border-bronze">
              <span className="avatar-initials">{top3[2].avatar}</span>
            </div>
            <h3 className="pedestal-user-name">{top3[2].name}</h3>
            <span className="pedestal-dept-tag">{top3[2].department}</span>
            <span className="pedestal-lvl-tag">Level {top3[2].level}</span>
            <div className="pedestal-xp-pill bronze-xp">
              <Sparkles size={14} /> {top3[2].xp.toLocaleString()} XP
            </div>
            <div className="pedestal-base base-bronze">
              <span className="base-rank-num">3</span>
            </div>
          </div>
        )}
      </div>

      {/* LEADERBOARD TABLE CARD */}
      <div className="leaderboard-table-card card">
        <div className="table-header-row">
          <div className="th-cell th-rank">Rank</div>
          <div className="th-cell th-user">Learner</div>
          <div className="th-cell th-dept">Department</div>
          <div className="th-cell th-level">Level</div>
          <div className="th-cell th-xp">Total XP</div>
        </div>

        <div className="table-rows-container">
          {others.map((user) => {
            const isCurrent = user.rank === currentUser.rank || user.name === currentUser.name;
            return (
              <div 
                key={user.rank} 
                className={`table-entry-row ${isCurrent ? 'current-player-row' : ''}`}
              >
                <div className="td-cell td-rank">
                  <span className={`rank-chip ${isCurrent ? 'my-rank' : ''}`}>#{user.rank}</span>
                </div>

                <div className="td-cell td-user">
                  <div className="row-avatar-circle">{user.avatar}</div>
                  <div className="row-user-details">
                    <span className="row-user-name">{user.name}</span>
                    {isCurrent && <span className="tag-you-pill">You</span>}
                  </div>
                </div>

                <div className="td-cell td-dept">
                  <span className="dept-text">{user.department}</span>
                </div>

                <div className="td-cell td-level">
                  <span className="lvl-badge-cell">Lvl {user.level}</span>
                </div>

                <div className="td-cell td-xp">
                  <span className="xp-val-text">{user.xp.toLocaleString()} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* MOTIVATIONAL BANNER WITH MASCOT */}
      <div className="leaderboard-cheer-banner card">
        <div className="cheer-mascot-wrapper">
          <ForgeMascot pose="welcome" size={80} />
        </div>
        <div className="cheer-content">
          <h3 className="cheer-title">You're within striking distance! 🎯</h3>
          <p className="cheer-desc">
            You're only <strong>320 XP</strong> behind Rank #11 Marcus Chen. Complete one daily quest today to take the lead!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
