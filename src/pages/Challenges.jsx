import { useState } from 'react';
import { Target, Zap, Clock, CheckCircle2, Trophy, Flame, Sparkles, ArrowRight, ShieldCheck, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import './Challenges.css';

const Challenges = () => {
  const { state, addXP } = useAppContext();
  const dailyQuests = state.quests || [];
  const [claimedQuests, setClaimedQuests] = useState({});

  const handleClaim = (questId, xp) => {
    setClaimedQuests(prev => ({ ...prev, [questId]: true }));
    addXP(xp, 'Mission Bounty Claimed');
  };

  return (
    <div className="challenges-realm animate-slide-up">
      {/* Header */}
      <div className="challenges-header-row">
        <div>
          <div className="header-pill">
            <Target size={14} className="text-purple" /> GUILD MISSION BOARD
          </div>
          <h1 className="challenges-main-title">Quests & Bounties</h1>
          <p className="challenges-sub">
            Pick your daily contracts, conquer weekly trials, and earn massive XP bounties.
          </p>
        </div>

        <div className="board-status-pills">
          <div className="timer-badge">
            <Clock size={16} className="text-coral" />
            <span>Daily Reset: <strong>14h 23m</strong></span>
          </div>
          <div className="active-quests-badge">
            <Zap size={16} className="text-gold" />
            <span><strong>{dailyQuests.filter(q => !q.completed).length}</strong> Active Quests</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Mission Board Left, Legendary Trials Right */}
      <div className="missions-grid">
        {/* LEFT COLUMN: DAILY BOUNTY CONTRACTS */}
        <div className="missions-col-left">
          <div className="card mission-board-card">
            <div className="section-header">
              <h2>
                <Flame size={22} className="text-coral" />
                DAILY BOUNTY CONTRACTS
              </h2>
              <span className="tag tag-gold">
                Pool: +{dailyQuests.reduce((sum, q) => sum + q.xpReward, 0)} XP
              </span>
            </div>

            <p className="mission-section-desc">
              Reset every 24 hours at midnight. Complete tasks to collect instant XP into your rank balance.
            </p>

            <div className="mission-cards-list">
              {dailyQuests.map((quest, idx) => {
                const isClaimed = claimedQuests[quest.id] || quest.completed;
                const difficultyVariants = ['Beginner', 'Easy', 'Medium', 'Easy'];
                const diff = difficultyVariants[idx % difficultyVariants.length];

                return (
                  <div key={quest.id} className={`mission-item-card ${isClaimed ? 'is-completed' : ''}`}>
                    <div className="mission-left-art">
                      {isClaimed ? (
                        <div className="mission-check-circle">
                          <CheckCircle2 size={24} />
                        </div>
                      ) : (
                        <div className="mission-target-circle">
                          <Target size={22} />
                        </div>
                      )}
                    </div>

                    <div className="mission-mid-content">
                      <div className="mission-top-tags">
                        <span className={`diff-pill pill-${diff.toLowerCase()}`}>{diff}</span>
                        <span className="deadline-tag"><Clock size={12} /> Today</span>
                      </div>
                      <h3 className="mission-title">{quest.title}</h3>

                      {quest.total ? (
                        <div className="mission-progress-block">
                          <div className="m-progress-header">
                            <span>Progress</span>
                            <strong>{quest.progress} / {quest.total}</strong>
                          </div>
                          <div className="progress-bar-bg small">
                            <div 
                              className="progress-bar-fill bg-blue" 
                              style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <p className="mission-hint">Complete through standard lessons or practice quiz.</p>
                      )}
                    </div>

                    <div className="mission-right-action">
                      <div className="mission-xp-chip">
                        <Sparkles size={14} /> +{quest.xpReward} XP
                      </div>
                      {isClaimed ? (
                        <span className="claimed-stamp">COMPLETED</span>
                      ) : (
                        <button 
                          className="btn btn-mint btn-sm"
                          onClick={() => handleClaim(quest.id, quest.xpReward)}
                        >
                          Claim Bounty
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COMPANY-WIDE CO-OP EVENT CHALLENGE */}
          <div className="card coop-event-card mt-6">
            <div className="coop-badge-strip">
              <Users size={16} /> COMPANY-WIDE RAID EVENT • 6 DAYS LEFT
            </div>
            <div className="coop-body">
              <div className="coop-text-content">
                <h3 className="coop-title">The Grand Cybersecurity Citadel</h3>
                <p className="coop-desc">
                  Company goal: 1,000 employees complete the Q2 Security Protocols. When unlocked, everyone receives the <strong>Cyber Defender Badge</strong> & 500 LearnCoins!
                </p>

                <div className="coop-progress-section">
                  <div className="coop-stats-row">
                    <span>Company Progress: <strong>742 / 1,000 Employees</strong></span>
                    <strong className="text-mint">74% Complete</strong>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill bg-mint" style={{ width: '74%' }}></div>
                  </div>
                </div>
              </div>

              <div className="coop-mascot-box">
                <ForgeMascot pose="thinking" size={100} />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: WEEKLY SPECIAL CHALLENGES & COMPANION */}
        <div className="missions-col-right">
          {/* WEEKLY SPECIAL CHALLENGE CARD */}
          <div className="card weekly-legendary-card highlight-glow">
            <div className="weekly-crown-ribbon">
              <Trophy size={15} /> WEEKLY TRIAL
            </div>

            <div className="trial-header">
              <div className="trial-icon-pod">
                <Zap size={36} className="text-gold" />
              </div>
              <h2 className="trial-title">Quiz Warrior Elite</h2>
              <p className="trial-subtitle">Score 85%+ on 3 module quizzes this week to unlock the legendary tier.</p>
            </div>

            <div className="trial-rewards-box">
              <span className="rewards-box-heading">Trial Bounties Upon Victory:</span>
              <div className="rewards-chips-row">
                <div className="reward-chip gold-chip">
                  <Sparkles size={16} /> +500 XP
                </div>
                <div className="reward-chip purple-chip">
                  <ShieldCheck size={16} /> Rare Badge
                </div>
              </div>
            </div>

            <div className="trial-progress-box">
              <div className="t-progress-info">
                <span>Trial Progress</span>
                <strong>2 of 3 Quizzes</strong>
              </div>
              <div className="progress-bar-bg large">
                <div className="progress-bar-fill bg-gold" style={{ width: '66%' }}></div>
              </div>
              <span className="trial-countdown"><Clock size={13} /> 3 days, 8 hours left</span>
            </div>

            <button className="btn btn-gold w-full mt-4" style={{ fontSize: '1rem', padding: '0.85rem' }}>
              Jump to Next Quiz <ArrowRight size={18} />
            </button>
          </div>

          {/* SECONDARY WEEKLY TRIAL */}
          <div className="card secondary-trial-card mt-6">
            <div className="section-header">
              <h3>
                <Flame size={18} className="text-coral" />
                Habit Builder
              </h3>
              <span className="tag tag-coral">+350 XP</span>
            </div>
            <p className="trial-small-desc">
              Complete at least one learning activity 5 days in a row this week.
            </p>
            <div className="progress-bar-bg small mt-3 mb-2">
              <div className="progress-bar-fill bg-coral" style={{ width: '80%' }}></div>
            </div>
            <div className="trial-meta-footer">
              <span>Current Streak: <strong>4 / 5 Days</strong></span>
              <span className="text-coral font-bold">1 day to go!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
