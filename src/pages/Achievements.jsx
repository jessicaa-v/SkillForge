import { Lock, Star, Flame, Brain, Zap, Shield, Trophy } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Achievements.css';

const iconMap = {
  Star: <Star size={32} />,
  Flame: <Flame size={32} />,
  Brain: <Brain size={32} />,
  Zap: <Zap size={32} />,
  Shield: <Shield size={32} />,
  Trophy: <Trophy size={32} />
};

const Achievements = () => {
  const { state } = useAppContext();
  const achievementsData = state.achievements;

  return (
    <div className="achievements-page animate-slide-up">
      <div className="page-header text-center">
        <h1>Achievement Gallery</h1>
        <p className="page-subtitle">Showcase your learning milestones and earn rare badges.</p>
      </div>

      <div className="category-tabs">
        <button className="tab active">All</button>
        <button className="tab">Unlocked</button>
        <button className="tab">Locked</button>
        <button className="tab">Rare</button>
        <button className="tab">Legendary</button>
      </div>

      <div className="achievements-grid">
        {achievementsData.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-card card ${achievement.locked ? 'locked' : ''} rarity-${achievement.rarity.toLowerCase()}`}
          >
            <div className="badge-container">
              {achievement.locked && (
                <div className="lock-overlay">
                  <Lock size={24} />
                </div>
              )}
              <div className="badge-icon">
                {iconMap[achievement.icon]}
              </div>
            </div>
            
            <div className="achievement-info">
              <h3>{achievement.title}</h3>
              <p className="achievement-desc">{achievement.description}</p>
            </div>

            <div className="achievement-meta">
              <span className={`tag rarity-tag tag-${achievement.rarity.toLowerCase()}`}>
                {achievement.rarity}
              </span>
              
              {achievement.locked ? (
                <div className="achievement-progress w-full mt-2">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.total}</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className="progress-bar-fill bg-blue" 
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <span className="achievement-date">Earned on {achievement.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
