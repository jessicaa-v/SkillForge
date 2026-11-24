import { Link } from 'react-router-dom';
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  Target, 
  ChevronRight, 
  CheckCircle2, 
  Coins, 
  Play, 
  ArrowRight,
  Zap,
  Calendar,
  Compass,
  Crown
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import { CategoryIllustration, CollectibleBadge } from '../components/GameIcons';
import RecommendedCourses from '../components/recommendations/RecommendedCourses';
import './Dashboard.css';

const weekDays = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: true },
  { day: 'Sat', completed: true },
  { day: 'Sun', completed: true, today: true },
];

const Dashboard = () => {
  const { state, addXP } = useAppContext();
  
  if (!state.user || state.user.role === 'hr') return null;
  
  const currentUser = state.user;
  const currentCourse = state.courses[0] || {
    id: 'c1',
    title: 'Workplace Communication',
    category: 'Communication',
    completedModules: 4,
    totalModules: 6,
    xpReward: 500,
    progress: 68
  };
  const progressPercent = Math.round((currentCourse.completedModules / currentCourse.totalModules) * 100);

  const top3 = (state.leaderboard || []).slice(0, 3);
  const recentAchievements = (state.achievements || []).filter(a => !a.locked).slice(0, 3);

  const handleQuestComplete = (_questId) => {
    addXP(150, 'Daily Quest Completed');
  };

  const xpProgress = Math.min(100, Math.round((currentUser.xp / currentUser.nextLevelXp) * 100));

  return (
    <div className="dashboard-container animate-slide-up">
      {/* 1. HERO SECTION WITH MASCOT */}
      <div className="hero-banner">
        <div className="hero-glow-bubble"></div>
        <div className="hero-content">
          <div className="hero-pill">
            <span className="pulse-dot"></span>
            DAILY QUEST ACTIVE
          </div>
          <h1 className="hero-title">
            Hey {currentUser.firstName || 'Alex'}! Ready to level up? 🚀
          </h1>
          <p className="hero-desc">
            You're on a <strong className="highlight-text">{currentUser.streak}-day streak!</strong> Forge new skills today to earn +350 XP and climb to Rank #{Math.max(1, currentUser.rank - 1)}.
          </p>

          <div className="hero-quick-actions">
            <Link to={`/course/${currentCourse.id}`} className="btn btn-primary btn-large">
              <Play size={18} fill="currentColor" /> Continue Lesson
            </Link>
            <Link to="/challenges" className="btn btn-secondary">
              <Compass size={18} /> View Mission Board
            </Link>
          </div>
        </div>

        <div className="hero-mascot-wrapper">
          <div className="mascot-speech-bubble">
            <span>"Let's forge some greatness today!" ⚡</span>
          </div>
          <ForgeMascot pose="welcome" size={170} />
        </div>
      </div>

      {/* 2. STATS CARDS GRID (Level, Total XP, Streak, Rank, LearnCoins) */}
      <div className="game-stats-grid">
        {/* Level Card with XP Bar */}
        <div className="game-stat-card card card-hover stat-card-level">
          <div className="stat-card-top">
            <div className="stat-icon-wrapper bg-purple-soft">
              <Trophy size={24} className="text-purple" />
            </div>
            <span className="stat-badge-pill pill-purple">Level {currentUser.level}</span>
          </div>
          <div className="stat-card-mid">
            <h3 className="stat-main-number">Lvl {currentUser.level}</h3>
            <span className="stat-caption">{currentUser.title || 'Senior Explorer'}</span>
          </div>
          <div className="stat-progress-section">
            <div className="progress-bar-bg small">
              <div 
                className="progress-bar-fill bg-purple" 
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <div className="progress-text-row">
              <span>{currentUser.xp?.toLocaleString()} XP</span>
              <span className="text-muted">{currentUser.nextLevelXp?.toLocaleString()} XP</span>
            </div>
          </div>
        </div>

        {/* Total XP Card */}
        <div className="game-stat-card card card-hover stat-card-xp">
          <div className="stat-card-top">
            <div className="stat-icon-wrapper bg-gold-soft">
              <Sparkles size={24} className="text-gold" />
            </div>
            <span className="stat-badge-pill pill-gold">+240 XP today</span>
          </div>
          <div className="stat-card-mid">
            <h3 className="stat-main-number text-gold">{currentUser.xp?.toLocaleString()}</h3>
            <span className="stat-caption">Total Accumulated XP</span>
          </div>
          <div className="stat-footer-text">
            <span>Next milestone at 10,000 XP</span>
          </div>
        </div>

        {/* Learning Streak Card */}
        <div className="game-stat-card card card-hover stat-card-streak">
          <div className="stat-card-top">
            <div className="stat-icon-wrapper bg-coral-soft">
              <Flame size={24} className="text-coral" />
            </div>
            <span className="stat-badge-pill pill-coral">On Fire! 🔥</span>
          </div>
          <div className="stat-card-mid">
            <h3 className="stat-main-number text-coral">{currentUser.streak} Days</h3>
            <span className="stat-caption">Active Learning Streak</span>
          </div>
          <div className="stat-footer-text">
            <span>Keep going to earn 10-day badge!</span>
          </div>
        </div>

        {/* Leaderboard Position */}
        <div className="game-stat-card card card-hover stat-card-rank">
          <div className="stat-card-top">
            <div className="stat-icon-wrapper bg-mint-soft">
              <Target size={24} className="text-mint" />
            </div>
            <span className="stat-badge-pill pill-mint">Top 15%</span>
          </div>
          <div className="stat-card-mid">
            <h3 className="stat-main-number text-mint">#{currentUser.rank}</h3>
            <span className="stat-caption">Global Leaderboard Rank</span>
          </div>
          <div className="stat-footer-text">
            <span>320 XP behind #{currentUser.rank - 1} Marcus</span>
          </div>
        </div>

        {/* LearnCoins */}
        <div className="game-stat-card card card-hover stat-card-coins">
          <div className="stat-card-top">
            <div className="stat-icon-wrapper bg-gold-soft">
              <Coins size={24} className="text-gold" />
            </div>
            <span className="stat-badge-pill pill-gold">Currency</span>
          </div>
          <div className="stat-card-mid">
            <h3 className="stat-main-number text-gold">{currentUser.coins?.toLocaleString() || '1,450'}</h3>
            <span className="stat-caption">LearnCoins Available</span>
          </div>
          <div className="stat-footer-text">
            <span className="shop-link">Redeem in Reward Vault →</span>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT (Two Column Layout) */}
      <div className="dashboard-main-grid">
        {/* Left Column: Learning Journey, Recommendations & Skills */}
        <div className="dashboard-col-primary">
          {/* PROMINENT LEARNING JOURNEY CONTINUE CARD */}
          <section className="card journey-hero-card">
            <div className="section-header">
              <h2>
                <Compass className="text-purple" size={22} />
                CURRENT LEARNING QUEST
              </h2>
              <span className="tag tag-purple">{currentCourse.category}</span>
            </div>

            <div className="journey-card-body">
              <div className="journey-illustration-col">
                <CategoryIllustration category={currentCourse.category} size={76} />
              </div>
              <div className="journey-info-col">
                <div className="journey-badge-row">
                  <span className="module-counter">Module {currentCourse.completedModules + 1} of {currentCourse.totalModules}</span>
                  <span className="reward-tag">+{currentCourse.xpReward} XP Reward</span>
                </div>
                <h3 className="journey-course-title">{currentCourse.title}</h3>
                <p className="journey-next-lesson">Next Up: <strong>Active Listening & Feedback Loops</strong></p>

                {/* Progress Bar with Milestones */}
                <div className="journey-progress-wrap">
                  <div className="progress-info-row">
                    <span>Course Progress</span>
                    <strong>{progressPercent}% Complete</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill bg-green" 
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="journey-actions-row">
                  <Link to={`/course/${currentCourse.id}`} className="btn btn-primary">
                    <Play size={16} fill="currentColor" /> Jump Into Lesson
                  </Link>
                  <Link to="/learning" className="btn btn-secondary">
                    All Courses <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* MINI RPG PATHWAY NODES PREVIEW */}
            <div className="mini-journey-pathway">
              <div className="pathway-node completed">
                <span className="node-icon">✓</span>
                <span className="node-label">Basics</span>
              </div>
              <div className="pathway-line completed"></div>

              <div className="pathway-node completed">
                <span className="node-icon">✓</span>
                <span className="node-label">Cues</span>
              </div>
              <div className="pathway-line completed"></div>

              <div className="pathway-node completed">
                <span className="node-icon">✓</span>
                <span className="node-label">Written</span>
              </div>
              <div className="pathway-line completed"></div>

              <div className="pathway-node current pulse-glow">
                <span className="node-icon">⚡</span>
                <span className="node-label">Active</span>
              </div>
              <div className="pathway-line"></div>

              <div className="pathway-node locked">
                <span className="node-icon">🔒</span>
                <span className="node-label">Conflict</span>
              </div>
              <div className="pathway-line"></div>

              <div className="pathway-node boss">
                <span className="node-icon">👑</span>
                <span className="node-label">Final Quiz</span>
              </div>
            </div>
          </section>

          {/* RECOMMENDED COURSES SECTION (Teammate Feature) */}
          <div className="mt-6">
            <RecommendedCourses courses={state.courses} user={currentUser} />
          </div>

          {/* SKILL PROGRESSION SECTION */}
          <section className="card skills-progression-card mt-6">
            <div className="section-header">
              <h2>
                <Zap className="text-gold" size={22} />
                SKILL MASTERY MATRIX
              </h2>
              <Link to="/profile" className="btn-text">
                Skill Tree Details <ChevronRight size={16} />
              </Link>
            </div>

            <div className="skills-grid">
              {Object.entries(currentUser.skills || {}).map(([skill, val], index) => {
                const colorVariants = ['bg-purple', 'bg-blue', 'bg-green', 'bg-gold', 'bg-coral'];
                const color = colorVariants[index % colorVariants.length];
                return (
                  <div key={skill} className="skill-card-item">
                    <div className="skill-card-header">
                      <span className="skill-title-text">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="skill-percent-pill">{val}%</span>
                    </div>
                    <div className="progress-bar-bg small">
                      <div className={`progress-bar-fill ${color}`} style={{ width: `${val}%` }}></div>
                    </div>
                    <span className="skill-rank-caption">Level {Math.floor(val / 10)} Proficient</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Quests, Streak Calendar, Leaderboard & Badges */}
        <div className="dashboard-col-secondary">
          {/* DAILY QUESTS BOARD */}
          <section className="card daily-quests-card">
            <div className="section-header">
              <h2>
                <Target className="text-mint" size={20} />
                DAILY QUESTS
              </h2>
              <span className="tag tag-gold">+500 XP Pool</span>
            </div>

            <div className="quests-stack">
              {state.quests.map((quest) => (
                <div 
                  key={quest.id} 
                  className={`quest-box ${quest.completed ? 'is-completed' : 'is-actionable'}`}
                  onClick={() => !quest.completed && handleQuestComplete(quest.id)}
                >
                  <div className="quest-checkbox-icon">
                    {quest.completed ? (
                      <CheckCircle2 size={24} className="text-mint" />
                    ) : (
                      <div className="quest-circle-target"></div>
                    )}
                  </div>
                  <div className="quest-details">
                    <h4 className="quest-title-text">{quest.title}</h4>
                    <span className="quest-reward-pill">+{quest.xpReward} XP</span>
                  </div>
                  {!quest.completed && (
                    <button className="quest-action-arrow" title="Claim / Start">
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* WEEKLY STREAK CALENDAR */}
          <section className="card streak-calendar-card mt-6">
            <div className="section-header">
              <h2>
                <Calendar className="text-coral" size={20} />
                WEEKLY STREAK
              </h2>
              <span className="streak-flame-count">
                <Flame size={16} className="text-coral" /> {currentUser.streak} Days
              </span>
            </div>
            <p className="streak-subtitle">Study everyday to protect your streak flame!</p>

            <div className="streak-days-row">
              {weekDays.map((d, i) => (
                <div key={i} className={`streak-day-box ${d.completed ? 'active-day' : ''} ${d.today ? 'today-day' : ''}`}>
                  <span className="day-name">{d.day}</span>
                  <div className="day-icon-circle">
                    {d.completed ? (
                      <Flame size={16} className="day-flame" />
                    ) : (
                      <span className="empty-day-dot"></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* LEADERBOARD PREVIEW (PODIUM FOR TOP 3) */}
          <section className="card leaderboard-preview-card mt-6">
            <div className="section-header">
              <h2>
                <Trophy className="text-gold" size={20} />
                TOP FORGERS
              </h2>
              <Link to="/leaderboard" className="btn-text">Full Board <ChevronRight size={16} /></Link>
            </div>

            <div className="podium-mini-container">
              {/* 2nd place */}
              {top3[1] && (
                <div className="podium-mini-slot silver">
                  <div className="podium-mini-rank">2</div>
                  <div className="podium-mini-avatar avatar-silver">{top3[1].avatar}</div>
                  <span className="podium-mini-name">{top3[1].name.split(' ')[0]}</span>
                  <span className="podium-mini-xp">{top3[1].xp?.toLocaleString()}</span>
                </div>
              )}

              {/* 1st place */}
              {top3[0] && (
                <div className="podium-mini-slot gold">
                  <div className="podium-crown-icon"><Crown size={18} fill="#FFC857" color="#D97706" /></div>
                  <div className="podium-mini-rank">1</div>
                  <div className="podium-mini-avatar avatar-gold">{top3[0].avatar}</div>
                  <span className="podium-mini-name">{top3[0].name.split(' ')[0]}</span>
                  <span className="podium-mini-xp">{top3[0].xp?.toLocaleString()}</span>
                </div>
              )}

              {/* 3rd place */}
              {top3[2] && (
                <div className="podium-mini-slot bronze">
                  <div className="podium-mini-rank">3</div>
                  <div className="podium-mini-avatar avatar-bronze">{top3[2].avatar}</div>
                  <span className="podium-mini-name">{top3[2].name.split(' ')[0]}</span>
                  <span className="podium-mini-xp">{top3[2].xp?.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Current user rank bar */}
            <div className="current-user-rank-strip">
              <span className="cur-rank">Your Rank: <strong>#{currentUser.rank}</strong></span>
              <span className="cur-xp"><strong>{currentUser.xp?.toLocaleString()} XP</strong></span>
            </div>
          </section>

          {/* RECENT ACHIEVEMENTS PREVIEW */}
          <section className="card achievements-preview-card mt-6">
            <div className="section-header">
              <h2>
                <Sparkles className="text-purple" size={20} />
                RECENT BADGES
              </h2>
              <Link to="/achievements" className="btn-text">View All <ChevronRight size={16} /></Link>
            </div>

            <div className="mini-achievements-row">
              {recentAchievements.map((item) => (
                <div key={item.id} className="badge-thumb-item" title={`${item.title}: ${item.description}`}>
                  <CollectibleBadge icon={<Sparkles size={20} />} rarity={item.rarity} size={54} />
                  <span className="badge-thumb-title">{item.title}</span>
                  <span className={`tag-micro tag-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
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
