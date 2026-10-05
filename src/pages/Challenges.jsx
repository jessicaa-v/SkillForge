import { Target, Zap, Clock, Star, AlertCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Challenges.css';

const Challenges = () => {
  const { state } = useAppContext();
  const dailyQuests = state.quests;

  return (
    <div className="challenges-page animate-slide-up">
      <div className="page-header">
        <div>
          <h1>Quests & Challenges</h1>
          <p className="page-subtitle">Complete tasks to earn XP and rare rewards.</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <Zap size={18} className="text-gold" />
            <span>2 Active Quests</span>
          </div>
        </div>
      </div>

      <div className="challenges-grid">
        <div className="col-left">
          <div className="card challenge-section">
            <div className="section-header">
              <div className="flex items-center gap-2">
                <Target size={20} className="text-primary" />
                <h2>Daily Quests</h2>
              </div>
              <span className="time-remaining text-muted"><Clock size={14} /> 14h 23m remaining</span>
            </div>
            
            <div className="quests-list-large">
              {dailyQuests.map((quest) => (
                <div key={quest.id} className={`quest-card ${quest.completed ? 'completed' : ''}`}>
                  <div className="quest-info">
                    <h3>{quest.title}</h3>
                    <div className="quest-reward-tag">
                      <Star size={14} /> +{quest.xpReward} XP
                    </div>
                  </div>
                  
                  {quest.total ? (
                    <div className="quest-progress">
                      <div className="progress-info">
                        <span>{quest.progress} / {quest.total}</span>
                      </div>
                      <div className="progress-bar-bg small">
                        <div 
                          className="progress-bar-fill bg-blue" 
                          style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <div className="quest-status">
                      {quest.completed ? (
                        <span className="status-badge success">Completed</span>
                      ) : (
                        <span className="status-badge pending">Pending</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-right">
          <div className="card special-challenge highlight-border">
            <div className="special-badge">Weekly Special</div>
            <div className="challenge-icon-large">
              <Zap size={40} className="text-gold" />
            </div>
            <h2>Quiz Warrior</h2>
            <p>Complete 3 quizzes this week with a score of 80% or higher.</p>
            
            <div className="challenge-rewards mt-4">
              <div className="reward-item">
                <Star size={16} className="text-gold" />
                <span>+500 XP</span>
              </div>
              <div className="reward-item">
                <div className="tag tag-purple">Rare Badge</div>
              </div>
            </div>
            
            <div className="quest-progress mt-6 w-full">
              <div className="progress-info">
                <span>Progress</span>
                <span>2 / 3</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill bg-gold" style={{ width: '66%' }}></div>
              </div>
            </div>
            
            <button className="btn btn-primary mt-6 w-full">Go to Quizzes</button>
          </div>

          <div className="card mt-6 border-dashed">
            <div className="empty-state text-center">
              <AlertCircle size={32} className="text-muted mb-2" />
              <h3>No Company Challenges</h3>
              <p className="text-muted text-sm mt-2">Check back later for company-wide learning challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
