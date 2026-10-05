import { Star, Flame, Trophy, Award, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Profile.css';

const Profile = () => {
  const { state } = useAppContext();
  
  if (!state.user || state.user.role === 'hr') return null;
  const currentUser = state.user;
  const achievementsData = state.achievements;

  return (
    <div className="profile-page animate-slide-up">
      <div className="profile-header card">
        <div className="profile-cover"></div>
        <div className="profile-info-container">
          <div className="profile-avatar-wrapper">
            <img 
              src={`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.name.split(' ')[1]}&background=6366F1&color=fff&size=150`} 
              alt={currentUser.name} 
              className="profile-avatar-large" 
            />
            <div className="level-badge-large">{currentUser.level}</div>
          </div>
          
          <div className="profile-details">
            <div className="profile-name-row">
              <h1>{currentUser.name}</h1>
              <span className="tag tag-gold">{currentUser.title}</span>
            </div>
            <p className="profile-job">{currentUser.jobTitle} • {currentUser.department}</p>
            
            <div className="profile-stats-row">
              <div className="stat-pill">
                <Star size={16} className="text-gold" />
                <span>{currentUser.xp.toLocaleString()} XP</span>
              </div>
              <div className="stat-pill">
                <Flame size={16} className="text-orange" />
                <span>{currentUser.streak} Day Streak</span>
              </div>
              <div className="stat-pill">
                <Trophy size={16} className="text-cyan" />
                <span>Rank #{currentUser.rank}</span>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="profile-content-grid">
        <div className="col-left">
          <div className="card">
            <div className="section-header">
              <h2>Skill Tree</h2>
            </div>
            <div className="skill-tree">
              {Object.entries(currentUser.skills).map(([skill, value]) => (
                <div key={skill} className="skill-node">
                  <div className="skill-node-header">
                    <span className="skill-name">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="skill-value">{value}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div className="progress-bar-fill bg-purple" style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="card mt-6">
            <div className="section-header">
              <h2>Learning Statistics</h2>
            </div>
            <div className="stats-grid-small">
              <div className="stat-box">
                <span className="stat-box-value">12</span>
                <span className="stat-box-label">Courses Completed</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-value">45</span>
                <span className="stat-box-label">Quizzes Passed</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-value">8</span>
                <span className="stat-box-label">Certificates Earned</span>
              </div>
              <div className="stat-box">
                <span className="stat-box-value">142h</span>
                <span className="stat-box-label">Learning Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-right">
          <div className="card">
            <div className="section-header">
              <h2>Top Achievements</h2>
              <button className="btn-text">View All</button>
            </div>
            <div className="achievements-list">
              {achievementsData.filter(a => !a.locked).slice(0, 4).map(achievement => (
                <div key={achievement.id} className="achievement-list-item">
                  <div className={`achievement-icon-small rarity-${achievement.rarity.toLowerCase()}`}>
                    <Award size={18} />
                  </div>
                  <div className="achievement-item-info">
                    <h4>{achievement.title}</h4>
                    <span>{achievement.description}</span>
                  </div>
                  <span className="achievement-item-date">{achievement.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
