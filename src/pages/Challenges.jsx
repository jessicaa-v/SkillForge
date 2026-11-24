import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Target, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Trophy, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Users,
  HelpCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import QuizDashboard from '../components/quiz/QuizDashboard';
import QuizPlayer from '../components/quiz/QuizPlayer';
import QuizResults from '../components/quiz/QuizResults';
import QuizReview from '../components/quiz/QuizReview';
import { quizzes, getQuizById } from '../data/quizData';
import { isRewardClaimed, saveQuizResult } from '../utils/quizStorage';
import './Challenges.css';
import '../components/quiz/Quiz.css';

const Challenges = () => {
  const { state, addXP, dispatch } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [claimedQuests, setClaimedQuests] = useState({});

  // Tab: 'quests' or 'quizzes'
  const tabParam = searchParams.get('tab');
  const activeTab = tabParam === 'quizzes' ? 'quizzes' : 'quests';
  const initialQuizId = searchParams.get('quiz');

  const [quizState, setQuizState] = useState({
    mode: initialQuizId ? 'playing' : 'dashboard', // 'dashboard' | 'playing' | 'results' | 'review'
    quizId: initialQuizId || null,
    results: null,
    xpAwarded: 0,
    wasAlreadyClaimed: false,
  });

  const dailyQuests = state.quests || [];

  const handleClaim = (questId, xp) => {
    setClaimedQuests(prev => ({ ...prev, [questId]: true }));
    addXP(xp, 'Mission Bounty Claimed');
  };

  const handleTabChange = (tab) => {
    setSearchParams(tab === 'quizzes' ? { tab: 'quizzes' } : {});
    if (tab === 'quizzes' && quizState.mode !== 'playing') {
      setQuizState((prev) => ({ ...prev, mode: 'dashboard' }));
    }
  };

  const handleStartQuiz = (quizId) => {
    const quiz = getQuizById(quizId);
    if (!quiz) return;

    setQuizState({
      mode: 'playing',
      quizId,
      results: null,
      xpAwarded: 0,
      wasAlreadyClaimed: isRewardClaimed(quizId),
    });
    setSearchParams({ tab: 'quizzes', quiz: quizId });
  };

  const handleFinishQuiz = (results) => {
    const quiz = getQuizById(results.quizId);
    if (!quiz) return;

    const alreadyClaimed = isRewardClaimed(quiz.id);
    let earnedXP = 0;

    if (!alreadyClaimed) {
      if (results.percentage >= 70) {
        earnedXP = Math.round((results.score / results.totalQuestions) * quiz.xpReward);
      } else if (results.percentage >= 50) {
        earnedXP = Math.round((results.score / results.totalQuestions) * quiz.xpReward * 0.5);
      }

      if (earnedXP > 0) {
        addXP(earnedXP, `Quiz: ${quiz.title}`);
      }
    }

    saveQuizResult({
      quizId: results.quizId,
      quizTitle: results.quizTitle,
      score: results.score,
      totalQuestions: results.totalQuestions,
      percentage: results.percentage,
      timeTakenSeconds: results.timeTakenSeconds,
      xpEarned: earnedXP,
      userAnswers: results.userAnswers,
    });

    if (results.percentage >= 80) {
      const quizQuest = state.quests.find((q) => q.id === 2);
      if (quizQuest && !quizQuest.completed) {
        dispatch({ type: 'COMPLETE_QUEST', payload: 2 });
        addXP(quizQuest.xpReward || 150, 'Daily Quest: Score 80%+ in a quiz');
      }
    }

    setQuizState({
      mode: 'results',
      quizId: results.quizId,
      results,
      xpAwarded: earnedXP,
      wasAlreadyClaimed: alreadyClaimed,
    });
    setSearchParams({ tab: 'quizzes' });
  };

  const handleExitQuiz = () => {
    setQuizState({
      mode: 'dashboard',
      quizId: null,
      results: null,
      xpAwarded: 0,
      wasAlreadyClaimed: false,
    });
    setSearchParams({ tab: 'quizzes' });
  };

  const handleReview = () => {
    setQuizState((prev) => ({ ...prev, mode: 'review' }));
  };

  const handleRetry = () => {
    if (quizState.quizId) {
      handleStartQuiz(quizState.quizId);
    }
  };

  const handleBackToChallenges = () => {
    setQuizState({
      mode: 'dashboard',
      quizId: null,
      results: null,
      xpAwarded: 0,
      wasAlreadyClaimed: false,
    });
    setSearchParams({});
  };

  const currentQuiz = quizState.quizId ? getQuizById(quizState.quizId) : null;
  const activeQuestsCount = dailyQuests.filter((q) => !q.completed).length;

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
            Pick your daily contracts, test your knowledge in interactive quizzes, and earn massive XP bounties.
          </p>
        </div>

        <div className="board-status-pills">
          <div className="timer-badge">
            <Clock size={16} className="text-coral" />
            <span>Daily Reset: <strong>14h 23m</strong></span>
          </div>
          <div className="active-quests-badge">
            <Zap size={16} className="text-gold" />
            <span><strong>{activeQuestsCount}</strong> Active Quests</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Quests vs Quizzes */}
      <div className="challenges-tabs-row" style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${activeTab === 'quests' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleTabChange('quests')}
          style={{ padding: '0.65rem 1.25rem' }}
        >
          <Target size={18} />
          <span>Daily Quests & Bounties</span>
        </button>

        <button
          className={`btn ${activeTab === 'quizzes' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => handleTabChange('quizzes')}
          style={{ padding: '0.65rem 1.25rem', gap: '0.5rem' }}
        >
          <HelpCircle size={18} />
          <span>Interactive Skill Quizzes</span>
          <span 
            style={{ 
              background: activeTab === 'quizzes' ? 'rgba(255,255,255,0.25)' : 'var(--color-primary-light)', 
              color: activeTab === 'quizzes' ? '#fff' : 'var(--color-primary)',
              borderRadius: '9999px', 
              padding: '0.1rem 0.5rem', 
              fontSize: '0.75rem', 
              fontWeight: 800 
            }}
          >
            {quizzes.length}
          </span>
        </button>
      </div>

      {/* TAB 1: GUILD MISSION BOARD */}
      {activeTab === 'quests' && (
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
                  Pool: +{dailyQuests.reduce((sum, q) => sum + (q.completed ? 0 : q.xpReward), 0)} XP
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

          {/* RIGHT COLUMN: WEEKLY SPECIAL CHALLENGES & TRIALS */}
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

              <button 
                className="btn btn-gold w-full mt-4" 
                style={{ fontSize: '1rem', padding: '0.85rem' }}
                onClick={() => handleTabChange('quizzes')}
              >
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
      )}

      {/* TAB 2: INTERACTIVE SKILL QUIZZES (Teammate Feature) */}
      {activeTab === 'quizzes' && (
        <div className="quiz-tab-content">
          {quizState.mode === 'dashboard' && (
            <QuizDashboard onStartQuiz={handleStartQuiz} />
          )}

          {quizState.mode === 'playing' && currentQuiz && (
            <QuizPlayer
              quiz={currentQuiz}
              onFinish={handleFinishQuiz}
              onExit={handleExitQuiz}
            />
          )}

          {quizState.mode === 'results' && quizState.results && currentQuiz && (
            <QuizResults
              results={quizState.results}
              quiz={currentQuiz}
              isAlreadyClaimed={quizState.wasAlreadyClaimed}
              xpAwarded={quizState.xpAwarded}
              onReview={handleReview}
              onRetry={handleRetry}
              onBackToChallenges={handleBackToChallenges}
            />
          )}

          {quizState.mode === 'review' && quizState.results && currentQuiz && (
            <QuizReview
              userAnswers={quizState.results.userAnswers}
              quizTitle={currentQuiz.title}
              onBackToResults={() =>
                setQuizState((prev) => ({ ...prev, mode: 'results' }))
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Challenges;
