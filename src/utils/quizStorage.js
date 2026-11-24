const STORAGE_KEY = 'skillforge_quiz_data';

const defaultStorage = {
  completedQuizzes: {}, // { [quizId]: boolean }
  quizScores: {},       // { [quizId]: { bestScore, bestPercentage, attempts, lastCompletedAt } }
  quizHistory: [],      // Array of attempt records
  claimedRewards: {},   // { [quizId]: number } XP claimed
};

export function getQuizStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultStorage };
    const parsed = JSON.parse(raw);
    return {
      completedQuizzes: parsed.completedQuizzes || {},
      quizScores: parsed.quizScores || {},
      quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
      claimedRewards: parsed.claimedRewards || {},
    };
  } catch (err) {
    console.error('Error loading quiz storage from localStorage:', err);
    return { ...defaultStorage };
  }
}

export function saveQuizResult({
  quizId,
  quizTitle,
  score,
  totalQuestions,
  percentage,
  timeTakenSeconds,
  xpEarned,
  userAnswers,
}) {
  try {
    const current = getQuizStorage();
    const existingScore = current.quizScores[quizId];
    
    const attempts = (existingScore?.attempts || 0) + 1;
    const bestScore = existingScore ? Math.max(existingScore.bestScore, score) : score;
    const bestPercentage = existingScore ? Math.max(existingScore.bestPercentage, percentage) : percentage;

    const updatedCompleted = {
      ...current.completedQuizzes,
      [quizId]: true,
    };

    const updatedScores = {
      ...current.quizScores,
      [quizId]: {
        bestScore,
        bestPercentage,
        lastScore: score,
        lastPercentage: percentage,
        attempts,
        lastCompletedAt: new Date().toISOString(),
      },
    };

    // Keep claimed rewards tracking
    const updatedClaimedRewards = { ...current.claimedRewards };
    if (xpEarned > 0 && !updatedClaimedRewards[quizId]) {
      updatedClaimedRewards[quizId] = xpEarned;
    }

    const historyRecord = {
      id: `${quizId}-${Date.now()}`,
      quizId,
      quizTitle,
      score,
      totalQuestions,
      percentage,
      timeTakenSeconds,
      xpEarned,
      completedAt: new Date().toISOString(),
      userAnswers: userAnswers || [],
    };

    const updatedHistory = [historyRecord, ...current.quizHistory].slice(0, 50); // keep last 50

    const updatedData = {
      completedQuizzes: updatedCompleted,
      quizScores: updatedScores,
      quizHistory: updatedHistory,
      claimedRewards: updatedClaimedRewards,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    return updatedData;
  } catch (err) {
    console.error('Error saving quiz result to localStorage:', err);
    return null;
  }
}

export function isQuizCompleted(quizId) {
  const data = getQuizStorage();
  return Boolean(data.completedQuizzes[quizId]);
}

export function isRewardClaimed(quizId) {
  const data = getQuizStorage();
  return Boolean(data.claimedRewards && data.claimedRewards[quizId]);
}

export function getQuizScore(quizId) {
  const data = getQuizStorage();
  return data.quizScores[quizId] || null;
}

export function formatDuration(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) return '0m 0s';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}
