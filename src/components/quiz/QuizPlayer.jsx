import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight 
} from 'lucide-react';
import { formatDuration } from '../../utils/quizStorage';

const optionLetters = ['A', 'B', 'C', 'D'];

const QuizPlayer = ({ quiz, onFinish, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Array of { questionId, selectedOption, isCorrect }

  const timerRef = useRef(null);

  // Timer effect
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const currentQuestion = quiz.questions[currentIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (index) => {
    if (isAnswerSubmitted) return; // locked once submitted
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const recordedAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      selectedOption,
      isCorrect,
      explanation: currentQuestion.explanation,
    };

    const nextAnswers = [...userAnswers, recordedAnswer];
    setUserAnswers(nextAnswers);

    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed all questions
      if (timerRef.current) clearInterval(timerRef.current);
      const correctCount = nextAnswers.filter((a) => a.isCorrect).length;
      const incorrectCount = totalQuestions - correctCount;
      const percentage = Math.round((correctCount / totalQuestions) * 100);

      onFinish({
        quizId: quiz.id,
        quizTitle: quiz.title,
        score: correctCount,
        totalQuestions,
        incorrectAnswers: incorrectCount,
        percentage,
        timeTakenSeconds: secondsElapsed,
        userAnswers: nextAnswers,
      });
    }
  };

  const handleExitClick = () => {
    if (window.confirm('Are you sure you want to exit the quiz? Your current progress will not be saved.')) {
      if (timerRef.current) clearInterval(timerRef.current);
      onExit();
    }
  };

  const isCorrect = selectedOption === currentQuestion.correctAnswer;

  return (
    <div className="quiz-player-container animate-slide-up">
      {/* Top Bar / Navigation */}
      <div className="quiz-player-header">
        <button className="quiz-player-exit-btn" onClick={handleExitClick}>
          <ChevronLeft size={18} /> Exit Quiz
        </button>

        <div className="quiz-player-meta-badges">
          <div className="quiz-timer-badge">
            <Clock size={14} />
            <span>{formatDuration(secondsElapsed)}</span>
          </div>
          <div className="quiz-question-counter-badge">
            Question {currentIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="quiz-progress-track">
        <div 
          className="quiz-progress-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="quiz-question-card">
        <div className="question-header">
          <span className="question-category-tag">{quiz.title} • {quiz.category}</span>
          <h2 className="question-prompt">{currentQuestion.question}</h2>
        </div>

        {/* 4 Multiple Choice Options */}
        <div className="quiz-options-list">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = currentQuestion.correctAnswer === idx;

            let optionClass = 'quiz-option-btn';
            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                optionClass += ' correct';
              } else if (isSelected && !isCorrectOption) {
                optionClass += ' incorrect';
              } else {
                optionClass += ' muted-option';
              }
            } else if (isSelected) {
              optionClass += ' selected';
            }

            return (
              <button
                key={idx}
                type="button"
                className={optionClass}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswerSubmitted}
              >
                <div className="option-letter-badge">
                  {optionLetters[idx]}
                </div>
                <div className="option-text">{option}</div>

                {isAnswerSubmitted && (
                  <div className="option-status-icon">
                    {isCorrectOption && (
                      <CheckCircle2 size={20} className="text-green-400" />
                    )}
                    {isSelected && !isCorrectOption && (
                      <XCircle size={20} className="text-red-400" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Answer Feedback (After Submitting) */}
        {isAnswerSubmitted && (
          <div className={`answer-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-headline">
              {isCorrect ? (
                <>
                  <CheckCircle2 size={20} />
                  <span>Correct! Outstanding reasoning!</span>
                </>
              ) : (
                <>
                  <XCircle size={20} />
                  <span>Incorrect. Review the policy below:</span>
                </>
              )}
            </div>
            <div className="feedback-explanation">
              <strong>Key Principle & Explanation:</strong>
              {currentQuestion.explanation}
            </div>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="quiz-actions-bar">
          <div className="quiz-hint-text">
            {!isAnswerSubmitted ? (
              selectedOption === null ? (
                <span>Select an answer to proceed</span>
              ) : (
                <span>Option {optionLetters[selectedOption]} selected • Click Submit Answer</span>
              )
            ) : (
              <span>Review the feedback, then click Continue</span>
            )}
          </div>

          {!isAnswerSubmitted ? (
            <button
              className="btn btn-primary"
              disabled={selectedOption === null}
              onClick={handleSubmitAnswer}
            >
              Submit Answer
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={handleNextQuestion}
            >
              {currentIndex + 1 === totalQuestions ? 'View Results' : 'Continue'} <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlayer;
