import { Medal } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Leaderboard.css';

const Leaderboard = () => {
  const { state } = useAppContext();
  const leaderboardData = state.leaderboard;
  const currentUser = state.user;

  const top3 = leaderboardData.slice(0, 3);
  const others = leaderboardData.slice(3);

  return (
    <div className="leaderboard animate-slide-up">
      <div className="page-header text-center">
        <h1>Global Leaderboard</h1>
        <p className="page-subtitle">See where you stand among your peers.</p>
      </div>

      <div className="leaderboard-tabs">
        <button className="tab active">Global</button>
        <button className="tab">Department</button>
        <button className="tab">Weekly</button>
        <button className="tab">Monthly</button>
      </div>

      <div className="podium-section">
        {/* 2nd Place */}
        <div className="podium-card silver">
          <div className="podium-rank">2</div>
          <div className="podium-avatar">
            <span className="avatar-text">{top3[1].avatar}</span>
          </div>
          <h3 className="podium-name">{top3[1].name}</h3>
          <span className="podium-level">Level {top3[1].level}</span>
          <span className="podium-xp">{top3[1].xp.toLocaleString()} XP</span>
        </div>

        {/* 1st Place */}
        <div className="podium-card gold">
          <div className="podium-crown">👑</div>
          <div className="podium-rank">1</div>
          <div className="podium-avatar">
            <span className="avatar-text">{top3[0].avatar}</span>
          </div>
          <h3 className="podium-name">{top3[0].name}</h3>
          <span className="podium-level">Level {top3[0].level}</span>
          <span className="podium-xp">{top3[0].xp.toLocaleString()} XP</span>
        </div>

        {/* 3rd Place */}
        <div className="podium-card bronze">
          <div className="podium-rank">3</div>
          <div className="podium-avatar">
            <span className="avatar-text">{top3[2].avatar}</span>
          </div>
          <h3 className="podium-name">{top3[2].name}</h3>
          <span className="podium-level">Level {top3[2].level}</span>
          <span className="podium-xp">{top3[2].xp.toLocaleString()} XP</span>
        </div>
      </div>

      <div className="leaderboard-list card">
        <div className="list-header">
          <div className="col-rank">Rank</div>
          <div className="col-user">Employee</div>
          <div className="col-dept">Department</div>
          <div className="col-level">Level</div>
          <div className="col-xp">XP</div>
        </div>

        {others.map((user) => (
          <div key={user.rank} className={`list-row ${user.rank === currentUser.rank ? 'highlight-current' : ''}`}>
            <div className="col-rank font-bold">#{user.rank}</div>
            <div className="col-user flex items-center gap-3">
              <div className="row-avatar">{user.avatar}</div>
              <span className="font-semibold">{user.name}</span>
              {user.rank === currentUser.rank && <span className="tag tag-blue ml-2">You</span>}
            </div>
            <div className="col-dept text-muted">{user.department}</div>
            <div className="col-level font-medium">Lvl {user.level}</div>
            <div className="col-xp text-gold font-bold">{user.xp.toLocaleString()} XP</div>
          </div>
        ))}
      </div>
      
      <div className="leaderboard-message">
        <Medal className="text-gold" />
        <span>You're only <strong>320 XP</strong> away from Rank #11! Keep learning to move up.</span>
      </div>
    </div>
  );
};

export default Leaderboard;
