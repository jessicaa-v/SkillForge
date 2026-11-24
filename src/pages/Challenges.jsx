import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Target, Zap, Clock, Star, AlertCircle, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
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

  const dailyQuests = state.quests;

  const handleTabChange = (tab) => {
    setSearchParams(tab === 'quizzes' ? { tab: 'quizzes' } : {});
    // Reset to dashboard mode when clicking quizzes tab
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

    // Calculate XP based on performance:
    // If percentage >= 70%, calculate score-proportional XP
    if (!alreadyClaimed) {
      if (results.percentage >= 70) {
        // Proportional to score
        earnedXP = Math.round((results.score / results.totalQuestions) * quiz.xpReward);
      } else if (results.percentage >= 50) {
        // Partial reward for 50-69%
        earnedXP = Math.round((results.score / results.totalQuestions) * quiz.xpReward * 0.5);
      }

      if (earnedXP > 0) {
        // Award XP through AppContext (triggers LevelUpModal and toast if leveled up)
        addXP(earnedXP, `Quiz: ${quiz.title}`);
      }
    }

    // Persist to localStorage
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

    // If score >= 80%, satisfy Daily Quest #2 ("Score 80%+ in a quiz")
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
    <div className="challenges-page animate-slide-up">
      {/* Top Header */}
      <div className="page-header">
        <div>
          <h1>Quests & Challenges</h1>
          <p className="page-subtitle">Complete tasks to earn XP and rare rewards.</p>
        </div>
        <div className="header-stats">
          <div className="stat-badge">
            <Zap size={18} className="text-gold" />
            <span>{activeQuestsCount} Active Quests</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="challenges-tabs">
        <button
          className={`challenges-tab-btn ${activeTab === 'quests' ? 'active' : ''}`}
          onClick={() => handleTabChange('quests')}
        >
          <Target size={18} />
          <span>Daily Quests & Challenges</span>
        </button>

        <button
          className={`challenges-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => handleTabChange('quizzes')}
        >
          <HelpCircle size={18} />
          <span>Interactive Quizzes</span>
          <span className="tab-count">{quizzes.length}</span>
        </button>
      </div>

      {/* TAB 1: Daily Quests & Challenges */}
      {activeTab === 'quests' && (
        <div className="challenges-grid">
          <div className="col-left">
            <div className="card challenge-section">
              <div className="section-header">
                <div className="flex items-center gap-2">
                  <Target size={20} className="text-primary" />
                  <h2>Daily Quests</h2>
                </div>
                <span className="time-remaining text-muted">
                  <Clock size={14} /> 14h 23m remaining
                </span>
              </div>

              <div className="quests-list-large">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`quest-card ${quest.completed ? 'completed' : ''}`}
                  >
                    <div className="quest-info">
                      <h3>{quest.title}</h3>
                      <div className="quest-reward-tag">
                        <Star size={14} /> +{quest.xpReward} XP
                      </div>
                    </div>

                    {quest.total ? (
                      <div className="quest-progress">
                        <div className="progress-info">
                          <span>
                            {quest.progress} / {quest.total}
                          </span>
                        </div>
                        <div className="progress-bar-bg small">
                          <div
                            className="progress-bar-fill bg-blue"
                            style={{
                              width: `${(quest.progress / quest.total) * 100}%`,
                            }}
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
                  <div
                    className="progress-bar-fill bg-gold"
                    style={{ width: '66%' }}
                  ></div>
                </div>
              </div>

              <button
                className="btn btn-primary mt-6 w-full"
                onClick={() => handleTabChange('quizzes')}
              >
                Go to Quizzes
              </button>
            </div>

            <div className="card mt-6 border-dashed">
              <div className="empty-state text-center">
                <AlertCircle size={32} className="text-muted mb-2" />
                <h3>No Company Challenges</h3>
                <p className="text-muted text-sm mt-2">
                  Check back later for company-wide learning challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Quizzes */}
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
