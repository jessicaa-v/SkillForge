import { Clock, Star, CheckCircle2, Award, ArrowRight, RotateCcw, ShieldCheck, MessageSquare, BookOpen } from 'lucide-react';

const QuizCard = ({ quiz, scoreData, isCompleted, isClaimed, onStart }) => {
  const getIcon = () => {
    switch (quiz.id) {
      case 'workplace-ethics':
        return <ShieldCheck size={26} />;
      case 'effective-communication':
        return <MessageSquare size={26} />;
      case 'hr-policies-compliance':
      default:
        return <BookOpen size={26} />;
    }
  };

  const getDifficultyClass = (diff) => {
    const lower = diff.toLowerCase();
    if (lower === 'beginner') return 'beginner';
    if (lower === 'intermediate') return 'intermediate';
    return 'advanced';
  };

  return (
    <div className="quiz-card card card-hover">
      <div>
        <div className="quiz-card-top">
          <div className={`quiz-icon-wrapper ${quiz.accentColor}`}>
            {getIcon()}
          </div>
          <div className="quiz-badges">
            <span className={`difficulty-badge ${getDifficultyClass(quiz.difficulty)}`}>
              {quiz.difficulty}
            </span>
            {isCompleted && (
              <span className="completed-badge">
                <CheckCircle2 size={13} /> Completed
              </span>
            )}
          </div>
        </div>

        <div className="quiz-category">{quiz.category}</div>
        <h3 className="quiz-title">{quiz.title}</h3>
        <p className="quiz-description">{quiz.description}</p>
      </div>

      <div>
        {isCompleted && scoreData && (
          <div className="quiz-score-preview">
            <span>Best Score: {scoreData.bestScore} / {quiz.totalQuestions} ({scoreData.bestPercentage}%)</span>
            {isClaimed && <span className="text-xs text-muted">XP Claimed</span>}
          </div>
        )}

        <div className="quiz-meta-row">
          <div className="meta-item">
            <Award size={15} className="text-primary" />
            <span>{quiz.totalQuestions} Questions</span>
          </div>
          <div className="meta-item">
            <Clock size={15} />
            <span>{quiz.estimatedDuration}</span>
          </div>
          <div className="meta-item xp">
            <Star size={15} />
            <span>+{quiz.xpReward} XP</span>
          </div>
        </div>

        <button 
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => onStart(quiz.id)}
        >
          {isCompleted ? (
            <>
              <RotateCcw size={16} /> Retake Quiz
            </>
          ) : (
            <>
              Start Quiz <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
