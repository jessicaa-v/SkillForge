import { Link } from 'react-router-dom';
import { Flame, Star, Target, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './Dashboard.css';

const Dashboard = () => {
  const { state, addXP } = useAppContext();
  
  if (!state.user || state.user.role === 'hr') return null;
  
  const currentUser = state.user;
  const currentCourse = state.courses[0];
  const progressPercent = (currentCourse.completedModules / currentCourse.totalModules) * 100;

  const handleQuestComplete = (questId) => {
    // Basic interaction
    addXP(150, 'Quest Completed');
  };

  return (
    <div className="dashboard animate-slide-up">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Good morning, {currentUser.firstName} 👋</h1>
          <p className="hero-subtitle">Ready to level up your skills?</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card level-card card card-hover">
          <div className="level-header">
            <span className="level-title">LEVEL {currentUser.level}</span>
            <span className="level-role">{currentUser.title}</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill gradient-bg" 
                style={{ width: `${(currentUser.xp / currentUser.nextLevelXp) * 100}%` }}
              ></div>
            </div>
            <div className="progress-labels">
              <span>{currentUser.xp.toLocaleString()} XP</span>
              <span>{currentUser.nextLevelXp.toLocaleString()} XP</span>
            </div>
          </div>
        </div>

        <div className="stat-card streak-stat card card-hover">
          <Flame size={32} className="stat-icon streak" />
          <div className="stat-details">
            <span className="stat-value">{currentUser.streak} Days</span>
            <span className="stat-label">Current Streak</span>
          </div>
        </div>

        <div className="stat-card rank-stat card card-hover">
          <Target size={32} className="stat-icon rank" />
          <div className="stat-details">
            <span className="stat-value">#{currentUser.rank}</span>
            <span className="stat-label">Global Rank</span>
          </div>
        </div>
        
        <div className="stat-card xp-stat card card-hover">
          <Star size={32} className="stat-icon xp" />
          <div className="stat-details">
            <span className="stat-value">{currentUser.xp.toLocaleString()}</span>
            <span className="stat-label">Total XP</span>
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div className="col-left">
          <section className="dashboard-section card">
            <div className="section-header">
              <h2>CONTINUE LEARNING</h2>
            </div>
            
            <div className="continue-course">
              <div className="course-thumbnail bg-purple">
                <Target size={40} className="thumbnail-icon" />
              </div>
              <div className="course-info">
                <h3>{currentCourse.title}</h3>
                <div className="course-meta">
                  <span className="tag tag-purple">{currentCourse.category}</span>
                  <span className="meta-text">{currentCourse.completedModules} of {currentCourse.totalModules} modules</span>
                  <span className="meta-text">+{currentCourse.xpReward} XP</span>
                </div>
                <div className="course-progress-wrapper">
                  <div className="progress-bar-bg small">
                    <div className="progress-bar-fill bg-green" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <span className="progress-text">{Math.round(progressPercent)}%</span>
                </div>
                <Link to={`/course/${currentCourse.id}`} className="btn btn-primary mt-4" style={{display: 'inline-flex', width: 'max-content'}}>
                  Continue Learning <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section className="dashboard-section card mt-6">
            <div className="section-header">
              <h2>SKILL PROGRESS</h2>
            </div>
            <div className="skills-list">
              {Object.entries(currentUser.skills).map(([skill, value]) => (
                <div key={skill} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="skill-value">{value}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div className="progress-bar-fill bg-blue" style={{ width: `${value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-right">
          <section className="dashboard-section card">
            <div className="section-header">
              <h2>DAILY QUESTS</h2>
              <span className="tag tag-gold">+{state.quests.reduce((acc, q) => acc + (q.completed ? 0 : q.xpReward), 0)} XP</span>
            </div>
            
            <div className="quests-list">
              {state.quests.map(quest => (
                <div key={quest.id} className={`quest-item ${quest.completed ? 'completed' : ''}`} onClick={() => !quest.completed && handleQuestComplete(quest.id)} style={{cursor: quest.completed ? 'default' : 'pointer'}}>
                  <div className="quest-icon">
                    {quest.completed ? <CheckCircle2 size={24} className="text-green" /> : <div className="circle-outline"></div>}
                  </div>
                  <div className="quest-content">
                    <h4>{quest.title}</h4>
                    <span className="quest-reward">+{quest.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section card mt-6">
            <div className="section-header">
              <h2>RECENT ACHIEVEMENTS</h2>
              <button className="btn-text">View All</button>
            </div>
            
            <div className="achievements-grid">
              {state.achievements.filter(a => !a.locked).slice(0, 4).map(achievement => (
                <div key={achievement.id} className="achievement-mini-card">
                  <div className={`achievement-icon rarity-${achievement.rarity.toLowerCase()}`}>
                    <Star size={20} />
                  </div>
                  <span className="achievement-title">{achievement.title}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
