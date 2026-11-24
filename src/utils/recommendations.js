import { getQuizStorage } from './quizStorage.js';

/**
 * Skill to course category mappings
 */
const skillCategoryMap = {
  Leadership: ['Leadership', 'Performance'],
  ProblemSolving: ['Performance', 'Communication'],
  Communication: ['Communication'],
  Compliance: ['Compliance'],
  Technical: ['Technical', 'Compliance']
};

/**
 * Generate personalized course recommendations based on:
 * 1. Weak skill areas (< 75%)
 * 2. Recent quiz scores (< 80% reinforces, >= 80% advances)
 * 3. Completed courses (next step progression)
 */
export function getPersonalizedRecommendations({ courses = [], user = null, limit = 3 }) {
  if (!Array.isArray(courses) || !courses.length) return [];

  // Exclude courses that are already 100% completed
  const eligibleCourses = courses.filter(
    (c) => c.status !== 'completed' && (typeof c.progress !== 'number' || c.progress < 100)
  );

  if (!eligibleCourses.length) return [];

  const quizStorage = getQuizStorage();
  const quizScores = quizStorage.quizScores || {};

  // Extract and rank user skills in ascending order (weakest first)
  const userSkills = user?.skills || {
    Leadership: 62,
    ProblemSolving: 71,
    Communication: 78,
    Technical: 84,
    Compliance: 91
  };

  const sortedSkills = Object.entries(userSkills)
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => a.score - b.score);

  const weakestSkill = sortedSkills[0]; // e.g. Leadership (62%)
  const secondaryWeakSkill = sortedSkills[1]; // e.g. ProblemSolving (71%)

  // Identify completed courses for next-step recommendations
  const completedCourseIds = courses
    .filter((c) => c.status === 'completed' || c.progress === 100)
    .map((c) => c.id);

  // Score each candidate course
  const scoredRecommendations = eligibleCourses.map((course) => {
    let priority = 50;
    let reason = 'Broaden your core workplace competencies';
    let reasonType = 'general';
    let reasonTag = 'Recommended';

    // 1. RULE: Check Quiz Scores (High priority for score remediation)
    if (course.category === 'Compliance' && quizScores['workplace-ethics']) {
      const ethicsScore = quizScores['workplace-ethics'].bestPercentage;
      if (ethicsScore < 80) {
        priority += 55;
        reason = `Reinforce compliance fundamentals following your Workplace Ethics Quiz (${ethicsScore}%)`;
        reasonType = 'quiz';
        reasonTag = 'Quiz Follow-up';
      } else {
        priority += 20;
        reason = `High Ethics quiz score! Advance your compliance certifications`;
        reasonType = 'quiz';
        reasonTag = 'Knowledge Expansion';
      }
    } else if (course.category === 'Compliance' && quizScores['hr-policies-compliance']) {
      const hrScore = quizScores['hr-policies-compliance'].bestPercentage;
      if (hrScore < 80) {
        priority += 55;
        reason = `Target areas flagged in your HR Policies and Compliance Quiz (${hrScore}%)`;
        reasonType = 'quiz';
        reasonTag = 'Quiz Follow-up';
      }
    } else if (course.category === 'Communication' && quizScores['effective-communication']) {
      const commScore = quizScores['effective-communication'].bestPercentage;
      if (commScore < 80) {
        priority += 55;
        reason = `Strengthen active communication skills based on your quiz results (${commScore}%)`;
        reasonType = 'quiz';
        reasonTag = 'Quiz Follow-up';
      } else if (course.id === 'c7') {
        priority += 35;
        reason = `High Communication quiz score! Progress into advanced team collaboration`;
        reasonType = 'quiz';
        reasonTag = 'Advanced Mastery';
      }
    }

    // 2. RULE: Check Weak Skill Areas (Highest priority if skill < 75%)
    if (weakestSkill && weakestSkill.score < 75) {
      const matchingCategories = skillCategoryMap[weakestSkill.name] || [];
      if (matchingCategories.includes(course.category)) {
        priority += 50;
        reason = `Target your lowest skill area: ${weakestSkill.name} (${weakestSkill.score}%)`;
        reasonType = 'skill';
        reasonTag = 'Skill Gap Focus';
      }
    }

    if (secondaryWeakSkill && secondaryWeakSkill.score < 75) {
      const matchingCategories = skillCategoryMap[secondaryWeakSkill.name] || [];
      if (matchingCategories.includes(course.category)) {
        priority += 30;
        if (reasonType === 'general') {
          reason = `Elevate proficiency in ${secondaryWeakSkill.name} (${secondaryWeakSkill.score}%)`;
          reasonType = 'skill';
          reasonTag = 'Skill Improvement';
        }
      }
    }

    // 3. RULE: Check Completed Course Progression
    if (completedCourseIds.includes('c2')) {
      // Completed Onboarding Essentials
      if (course.id === 'c1' || course.id === 'c4') {
        priority += 35;
        if (reasonType === 'general') {
          reason = `Recommended next step after completing Employee Onboarding Essentials`;
          reasonType = 'completed_course';
          reasonTag = 'Next in Learning Path';
        }
      }
    }

    if (completedCourseIds.includes('c5')) {
      // Completed Cybersecurity
      if (course.category === 'Compliance') {
        priority += 25;
        if (reasonType === 'general') {
          reason = `Complete your required organizational compliance roadmap`;
          reasonType = 'completed_course';
          reasonTag = 'Compliance Track';
        }
      }
    }

    // In-progress boost (encourage finishing what was started)
    if (course.status === 'in-progress') {
      priority += 15;
    }

    return {
      ...course,
      reason,
      reasonType,
      reasonTag,
      priority
    };
  });

  // Sort by calculated priority descending and slice top results
  scoredRecommendations.sort((a, b) => b.priority - a.priority);

  return scoredRecommendations.slice(0, limit);
}
