export const currentUser = {
  id: "emp-001",
  name: "Alex Thorne",
  firstName: "Alex",
  title: "Senior Explorer",
  jobTitle: "Product Designer",
  department: "Product",
  level: 12,
  xp: 8420,
  nextLevelXp: 10000,
  streak: 7,
  rank: 12,
  coins: 1450,
  skills: {
    Communication: 78,
    Leadership: 62,
    Technical: 84,
    Compliance: 91,
    ProblemSolving: 71,
  },
};

export const leaderboardData = [
  { rank: 1, name: "Sarah Jenkins", avatar: "SJ", department: "Engineering", level: 18, xp: 12450 },
  { rank: 2, name: "Arjun Patel", avatar: "AP", department: "Product", level: 16, xp: 11820 },
  { rank: 3, name: "Priya Sharma", avatar: "PS", department: "Marketing", level: 15, xp: 10950 },
  { rank: 11, name: "Marcus Chen", avatar: "MC", department: "Sales", level: 12, xp: 8740 },
  { rank: 12, name: "Alex Thorne", avatar: "AT", department: "Product", level: 12, xp: 8420 },
  { rank: 13, name: "Emma Wilson", avatar: "EW", department: "HR", level: 11, xp: 8100 },
];

export const achievementsData = [
  { id: 1, title: "First Steps", description: "Complete your first lesson.", rarity: "Common", date: "Jan 12", icon: "Star" },
  { id: 2, title: "Streak Master", description: "Maintain a 7-day streak.", rarity: "Rare", date: "Feb 04", icon: "Flame" },
  { id: 3, title: "Quiz Master", description: "Score 90%+ on 5 quizzes.", rarity: "Epic", date: "Mar 15", icon: "Brain" },
  { id: 4, title: "Fast Learner", description: "Complete 3 courses in one week.", rarity: "Legendary", locked: true, progress: 2, total: 3, icon: "Zap" },
  { id: 5, title: "Compliance Champion", description: "Complete all mandatory compliance courses.", rarity: "Epic", date: "Mar 22", icon: "Shield" },
  { id: 6, title: "Course Crusher", description: "Complete 10 courses.", rarity: "Legendary", locked: true, progress: 6, total: 10, icon: "Trophy" },
];

export const coursesData = [
  { id: "c1", title: "Workplace Communication", category: "Communication", progress: 68, completedModules: 4, totalModules: 6, xpReward: 500, time: "2h 15m", status: "in-progress", difficulty: "Beginner", rating: 4.8 },
  { id: "c2", title: "Employee Onboarding Essentials", category: "Onboarding", progress: 100, completedModules: 5, totalModules: 5, xpReward: 400, time: "1h 30m", status: "completed", difficulty: "Beginner", rating: 4.9 },
  { id: "c3", title: "Workplace Safety & Compliance", category: "Compliance", progress: 0, completedModules: 0, totalModules: 4, xpReward: 300, time: "1h", status: "not-started", difficulty: "Beginner", rating: 4.5 },
  { id: "c4", title: "Leadership Fundamentals", category: "Leadership", progress: 0, completedModules: 0, totalModules: 8, xpReward: 1000, time: "4h", status: "not-started", difficulty: "Intermediate", rating: 4.7 },
  { id: "c5", title: "Cybersecurity Awareness", category: "Compliance", progress: 100, completedModules: 3, totalModules: 3, xpReward: 450, time: "1h 15m", status: "completed", difficulty: "Beginner", rating: 4.6 },
  { id: "c6", title: "Performance Management", category: "Performance", progress: 0, completedModules: 0, totalModules: 5, xpReward: 600, time: "2h", status: "not-started", difficulty: "Intermediate", rating: 4.4 },
  { id: "c7", title: "Team Collaboration", category: "Communication", progress: 20, completedModules: 1, totalModules: 5, xpReward: 500, time: "1h 45m", status: "in-progress", difficulty: "Beginner", rating: 4.8 },
];

export const dailyQuests = [
  { id: 1, title: "Complete one lesson", xpReward: 100, completed: true },
  { id: 2, title: "Score 80%+ in a quiz", xpReward: 150, completed: false, progress: 0, total: 1 },
  { id: 3, title: "Complete today's challenge", xpReward: 200, completed: false, progress: 0, total: 1 },
  { id: 4, title: "Maintain your streak", xpReward: 50, completed: true },
];

export const currentCourseModule = {
  courseId: "c1",
  title: "Workplace Communication",
  module: 5,
  lesson: "Active Listening Techniques",
};
