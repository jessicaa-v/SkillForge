import { useState } from 'react';
import { Zap } from 'lucide-react';
import QuizCard from './QuizCard';
import { quizzes } from '../../data/quizData';
import { getQuizStorage } from '../../utils/quizStorage';

const QuizDashboard = ({ onStartQuiz }) => {
  const [storageData] = useState(() => getQuizStorage());

  const completedCount = Object.keys(storageData.completedQuizzes).filter(
    (k) => storageData.completedQuizzes[k]
  ).length;

  const claimedTotalXP = Object.values(storageData.claimedRewards).reduce(
    (acc, val) => acc + (typeof val === 'number' ? val : 0),
    0
  );

  return (
    <div className="quiz-section animate-slide-up">
      {/* Header Banner */}
      <div className="quiz-header-banner">
        <div className="quiz-banner-content">
          <div className="quiz-banner-badge">
            <Zap size={14} /> Knowledge Certifications
          </div>
          <h2 className="quiz-banner-title">Interactive HR Quizzes</h2>
          <p className="quiz-banner-desc">
            Test your knowledge across Workplace Ethics, Communication, and HR Policies.
            Earn XP, unlock achievements, and strengthen core corporate proficiencies.
          </p>
        </div>

        <div className="quiz-summary-stats">
          <div className="quiz-stat-pill">
            <span className="stat-number">{quizzes.length}</span>
            <span className="stat-label">Available</span>
          </div>
          <div className="quiz-stat-pill">
            <span className="stat-number text-green-400">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </div>
          <div className="quiz-stat-pill">
            <span className="stat-number text-gold">{claimedTotalXP}</span>
            <span className="stat-label">XP Claimed</span>
          </div>
        </div>
      </div>

      {/* Quiz Cards Grid */}
      <div className="quiz-grid">
        {quizzes.map((quiz) => {
          const isCompleted = Boolean(storageData.completedQuizzes[quiz.id]);
          const isClaimed = Boolean(storageData.claimedRewards[quiz.id]);
          const scoreData = storageData.quizScores[quiz.id];

          return (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              scoreData={scoreData}
              isCompleted={isCompleted}
              isClaimed={isClaimed}
              onStart={onStartQuiz}
            />
          );
        })}
      </div>
    </div>
  );
};

export default QuizDashboard;
