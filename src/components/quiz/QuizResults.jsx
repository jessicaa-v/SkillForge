import { 
  Trophy, 
  RotateCcw, 
  ArrowLeft, 
  FileText,
  Sparkles,
  Award,
  Star
} from 'lucide-react';
import { formatDuration } from '../../utils/quizStorage';

const QuizResults = ({
  results,
  quiz,
  isAlreadyClaimed,
  xpAwarded,
  onReview,
  onRetry,
  onBackToChallenges,
}) => {
  const isPassed = results.percentage >= 70;

  return (
    <div className="quiz-results-container animate-slide-up">
      {/* Hero Card */}
      <div className="quiz-results-hero">
        <div className={`results-celebration-icon ${isPassed ? 'pass' : ''}`}>
          <Trophy size={42} />
        </div>

        <h1 className="results-title">
          {isPassed ? 'Quiz Completed! 🎉' : 'Quiz Completed!'}
        </h1>
        <p className="results-subtitle">
          {isPassed 
            ? `Fantastic work on ${quiz.title}! You demonstrated high workplace proficiency.` 
            : `Good effort on ${quiz.title}. Review the questions to reinforce your knowledge.`
          }
        </p>

        {/* XP Banner */}
        {xpAwarded > 0 ? (
          <div className="xp-reward-alert">
            <Sparkles size={20} />
            <span>+{xpAwarded} XP Earned & Credited!</span>
          </div>
        ) : isAlreadyClaimed ? (
          <div className="xp-already-claimed-notice">
            <Star size={16} className="text-gold" />
            <span>XP for this quiz has already been claimed on a previous attempt. Great practice!</span>
          </div>
        ) : (
          <div className="xp-already-claimed-notice">
            <Award size={16} />
            <span>Score 70% or higher to unlock the full XP reward!</span>
          </div>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="results-stats-grid">
        <div className="result-stat-card">
          <span className="result-stat-val">{results.totalQuestions}</span>
          <span className="result-stat-label">Total Questions</span>
        </div>

        <div className="result-stat-card">
          <span className="result-stat-val correct">{results.score}</span>
          <span className="result-stat-label">Correct Answers</span>
        </div>

        <div className="result-stat-card">
          <span className="result-stat-val incorrect">{results.incorrectAnswers}</span>
          <span className="result-stat-label">Incorrect Answers</span>
        </div>

        <div className="result-stat-card">
          <span className="result-stat-val percentage">{results.percentage}%</span>
          <span className="result-stat-label">Final Percentage</span>
        </div>

        <div className="result-stat-card">
          <span className="result-stat-val">{formatDuration(results.timeTakenSeconds)}</span>
          <span className="result-stat-label">Time Taken</span>
        </div>

        <div className="result-stat-card">
          <span className="result-stat-val xp">
            {xpAwarded > 0 ? `+${xpAwarded}` : isAlreadyClaimed ? 'Claimed' : '0'}
          </span>
          <span className="result-stat-label">XP Earned</span>
        </div>
      </div>

      {/* Actions */}
      <div className="results-actions">
        <button className="btn btn-secondary" onClick={onReview}>
          <FileText size={16} /> Review Answers
        </button>

        <button className="btn btn-secondary" onClick={onRetry}>
          <RotateCcw size={16} /> Retry Quiz
        </button>

        <button className="btn btn-primary" onClick={onBackToChallenges}>
          <ArrowLeft size={16} /> Back to Challenges
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
