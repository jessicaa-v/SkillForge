import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuizReview = ({ userAnswers, quizTitle, onBackToResults }) => {
  const [filter, setFilter] = useState('all'); // 'all' | 'incorrect' | 'correct'

  const filteredAnswers = userAnswers.filter((item) => {
    if (filter === 'incorrect') return !item.isCorrect;
    if (filter === 'correct') return item.isCorrect;
    return true;
  });

  return (
    <div className="quiz-review-container animate-slide-up">
      <div className="review-header">
        <div>
          <button className="quiz-player-exit-btn" onClick={onBackToResults}>
            <ArrowLeft size={18} /> Back to Results
          </button>
          <h2 className="mt-2 text-xl font-bold">Review: {quizTitle}</h2>
        </div>

        <div className="review-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({userAnswers.length})
          </button>
          <button
            className={`filter-btn ${filter === 'incorrect' ? 'active' : ''}`}
            onClick={() => setFilter('incorrect')}
          >
            Incorrect ({userAnswers.filter((a) => !a.isCorrect).length})
          </button>
          <button
            className={`filter-btn ${filter === 'correct' ? 'active' : ''}`}
            onClick={() => setFilter('correct')}
          >
            Correct ({userAnswers.filter((a) => a.isCorrect).length})
          </button>
        </div>
      </div>

      <div className="review-questions-list">
        {filteredAnswers.length === 0 ? (
          <div className="card text-center p-8 text-muted">
            No questions match this filter.
          </div>
        ) : (
          filteredAnswers.map((item, idx) => (
            <div 
              key={item.questionId || idx} 
              className={`review-item-card ${item.isCorrect ? 'correct-item' : 'incorrect-item'}`}
            >
              <div className="review-item-top">
                <span className="review-q-number">Question {item.questionId}</span>
                <span className={`review-q-status ${item.isCorrect ? 'correct' : 'incorrect'}`}>
                  {item.isCorrect ? (
                    <>
                      <CheckCircle2 size={14} /> Correct
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Incorrect
                    </>
                  )}
                </span>
              </div>

              <h3 className="review-prompt">{item.question}</h3>

              <div className="review-options">
                {item.options.map((opt, optIdx) => {
                  const isCorrectAnswer = optIdx === item.correctAnswer;
                  const isUserSelection = optIdx === item.selectedOption;

                  let rowClass = 'review-option-row';
                  if (isCorrectAnswer) {
                    rowClass += ' is-correct-answer';
                  } else if (isUserSelection && !item.isCorrect) {
                    rowClass += ' user-wrong-selection';
                  }

                  return (
                    <div key={optIdx} className={rowClass}>
                      <span className="option-letter-badge">
                        {optionLetters[optIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isCorrectAnswer && (
                        <span className="text-xs font-bold text-green-400">
                          (Correct Answer)
                        </span>
                      )}
                      {isUserSelection && !isCorrectAnswer && (
                        <span className="text-xs font-bold text-red-400">
                          (Your Answer)
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="review-explanation">
                <strong>Explanation:</strong>
                {item.explanation}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={onBackToResults}>
          <ArrowLeft size={16} /> Back to Results
        </button>
      </div>
    </div>
  );
};

export default QuizReview;
