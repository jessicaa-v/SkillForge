const FEEDBACK_STORAGE_KEY = 'skillforge_course_feedback';

export const evaluationQuestions = [
  {
    id: 'q1Clarity',
    question: 'How clear, engaging, and well-structured was the course curriculum?',
    options: ['Poorly Structured', 'Somewhat Clear', 'Clear & Structured', 'Extremely Engaging & Clear']
  },
  {
    id: 'q2Applicability',
    question: 'How directly applicable is this knowledge to your day-to-day job duties?',
    options: ['Not Applicable', 'Slightly Relevant', 'Directly Applicable', 'Critical to My Daily Work']
  },
  {
    id: 'q3Recommendation',
    question: 'How likely are you to recommend this training course to a colleague?',
    options: ['Unlikely', 'Neutral', 'Likely', 'Strongly Recommend']
  }
];

const defaultInitialFeedback = [
  {
    id: 'fb-c2-01',
    courseId: 'c2',
    courseTitle: 'Employee Onboarding Essentials',
    userId: 'emp-002',
    userName: 'Sarah Jenkins',
    userRole: 'Senior Staff Engineer',
    userDepartment: 'Engineering',
    rating: 5,
    q1Clarity: 'Extremely Engaging & Clear',
    q2Applicability: 'Directly Applicable',
    q3Recommendation: 'Strongly Recommend',
    comments: 'The onboarding modules made joining the engineering department frictionless. High-impact summaries and realistic scenarios.',
    submittedAt: '2026-02-14T10:30:00.000Z'
  },
  {
    id: 'fb-c2-02',
    courseId: 'c2',
    courseTitle: 'Employee Onboarding Essentials',
    userId: 'emp-003',
    userName: 'Arjun Patel',
    userRole: 'Product Manager',
    userDepartment: 'Product',
    rating: 5,
    q1Clarity: 'Extremely Engaging & Clear',
    q2Applicability: 'Critical to My Daily Work',
    q3Recommendation: 'Strongly Recommend',
    comments: 'Exceptional overview of corporate culture and cross-functional expectations. Every new hire should take this in week one.',
    submittedAt: '2026-02-18T14:15:00.000Z'
  },
  {
    id: 'fb-c5-01',
    courseId: 'c5',
    courseTitle: 'Cybersecurity Awareness',
    userId: 'emp-004',
    userName: 'Priya Sharma',
    userRole: 'Marketing Specialist',
    userDepartment: 'Marketing',
    rating: 4,
    q1Clarity: 'Clear & Structured',
    q2Applicability: 'Critical to My Daily Work',
    q3Recommendation: 'Strongly Recommend',
    comments: 'Great real-world examples of phishing and social engineering attacks. Very practical guidelines for remote workers.',
    submittedAt: '2026-03-01T09:45:00.000Z'
  },
  {
    id: 'fb-c5-02',
    courseId: 'c5',
    courseTitle: 'Cybersecurity Awareness',
    userId: 'emp-005',
    userName: 'Marcus Chen',
    userRole: 'Account Executive',
    userDepartment: 'Sales',
    rating: 5,
    q1Clarity: 'Extremely Engaging & Clear',
    q2Applicability: 'Directly Applicable',
    q3Recommendation: 'Strongly Recommend',
    comments: 'Short, sharp, and non-intimidating. The password manager and two-factor tips were immediately useful.',
    submittedAt: '2026-03-05T16:20:00.000Z'
  },
  {
    id: 'fb-c1-01',
    courseId: 'c1',
    courseTitle: 'Workplace Communication',
    userId: 'emp-006',
    userName: 'Emma Wilson',
    userRole: 'HR Generalist',
    userDepartment: 'HR',
    rating: 5,
    q1Clarity: 'Extremely Engaging & Clear',
    q2Applicability: 'Critical to My Daily Work',
    q3Recommendation: 'Strongly Recommend',
    comments: 'The active listening models and constructive feedback frameworks transformed how our team manages sprint reviews.',
    submittedAt: '2026-03-10T11:00:00.000Z'
  }
];

export function getAllFeedback() {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(defaultInitialFeedback));
      return defaultInitialFeedback;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultInitialFeedback;
  } catch (err) {
    console.error('Error loading course feedback from localStorage:', err);
    return defaultInitialFeedback;
  }
}

export function getFeedbackByCourse(courseId) {
  const all = getAllFeedback();
  return all.filter(f => f.courseId === courseId);
}

export function getUserFeedbackForCourse(courseId, userId) {
  const all = getAllFeedback();
  return all.find(f => f.courseId === courseId && f.userId === userId) || null;
}

export function saveCourseFeedback({
  courseId,
  courseTitle,
  userId,
  userName,
  userRole,
  userDepartment,
  rating,
  q1Clarity,
  q2Applicability,
  q3Recommendation,
  comments
}) {
  try {
    const all = getAllFeedback();
    const existingIndex = all.findIndex(f => f.courseId === courseId && f.userId === userId);

    const feedbackRecord = {
      id: existingIndex >= 0 ? all[existingIndex].id : `fb-${courseId}-${Date.now()}`,
      courseId,
      courseTitle,
      userId: userId || 'emp-001',
      userName: userName || 'Alex Thorne',
      userRole: userRole || 'Product Designer',
      userDepartment: userDepartment || 'Product',
      rating: Number(rating) || 5,
      q1Clarity: q1Clarity || evaluationQuestions[0].options[2],
      q2Applicability: q2Applicability || evaluationQuestions[1].options[2],
      q3Recommendation: q3Recommendation || evaluationQuestions[2].options[3],
      comments: (comments || '').trim(),
      submittedAt: new Date().toISOString()
    };

    let updated;
    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = feedbackRecord;
    } else {
      updated = [feedbackRecord, ...all];
    }

    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updated));
    return feedbackRecord;
  } catch (err) {
    console.error('Error saving course feedback to localStorage:', err);
    return null;
  }
}

export function getCourseFeedbackSummary(courseId, initialCourseRating = 4.8) {
  const list = getFeedbackByCourse(courseId);
  if (!list.length) {
    return {
      averageRating: initialCourseRating,
      totalReviews: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      clarityRate: 100,
      applicabilityRate: 100,
      recommendationRate: 100,
      reviews: []
    };
  }

  const total = list.length;
  const sumRatings = list.reduce((acc, f) => acc + (f.rating || 5), 0);
  const avg = Number((sumRatings / total).toFixed(1));

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  list.forEach(f => {
    const r = Math.min(Math.max(Math.round(f.rating || 5), 1), 5);
    distribution[r] = (distribution[r] || 0) + 1;
  });

  // Positive responses rates
  const clarityPositive = list.filter(f => f.q1Clarity?.includes('Clear') || f.q1Clarity?.includes('Structured')).length;
  const applicabilityPositive = list.filter(f => f.q2Applicability?.includes('Applicable') || f.q2Applicability?.includes('Daily')).length;
  const recommendationPositive = list.filter(f => f.q3Recommendation?.includes('Recommend') || f.q3Recommendation?.includes('Likely')).length;

  return {
    averageRating: avg,
    totalReviews: total,
    distribution,
    clarityRate: Math.round((clarityPositive / total) * 100),
    applicabilityRate: Math.round((applicabilityPositive / total) * 100),
    recommendationRate: Math.round((recommendationPositive / total) * 100),
    reviews: list
  };
}
