import { createContext, useContext, useReducer, useEffect } from 'react';
import { currentUser as mockUser, coursesData, achievementsData, dailyQuests, leaderboardData } from '../data/mockData';

const AppContext = createContext();

const initialState = {
  user: null, // null means not logged in
  courses: coursesData,
  achievements: achievementsData,
  quests: dailyQuests,
  leaderboard: leaderboardData,
  notifications: [],
  levelUpData: null, // triggers modal if not null
  toast: null,
};

function getNextLevelXp(level) {
  if (level === 1) return 500;
  if (level === 2) return 1200;
  if (level === 3) return 2000;
  if (level === 4) return 3000;
  if (level === 5) return 4200;
  if (level === 6) return 5600;
  if (level === 7) return 7200;
  if (level === 8) return 9000;
  if (level === 9) return 11000;
  return level * 1500; // rough fallback
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_XP': {
      if (!state.user || state.user.role === 'hr') return state;
      const newXp = state.user.xp + action.payload.amount;
      let newLevel = state.user.level;
      let levelUp = null;
      let nextLevelXp = state.user.nextLevelXp;

      if (newXp >= nextLevelXp) {
        newLevel += 1;
        nextLevelXp = getNextLevelXp(newLevel);
        levelUp = {
          level: newLevel,
          rewards: ['+500 Bonus XP', 'New Badge', 'New Profile Frame']
        };
      }

      // Automatically add bonus XP if leveled up
      const finalXp = levelUp ? newXp + 500 : newXp;

      // Update user
      const updatedUser = { 
        ...state.user, 
        xp: finalXp, 
        level: newLevel, 
        nextLevelXp 
      };

      // Add notification
      const notification = {
        id: Date.now(),
        title: action.payload.source || 'XP Earned',
        message: `You earned ${action.payload.amount} XP!`,
        read: false,
        time: 'Just now'
      };

      // Update leaderboard for this user
      const updatedLeaderboard = state.leaderboard.map(u => 
        u.id === updatedUser.id || u.name === updatedUser.name ? { ...u, xp: finalXp, level: newLevel } : u
      ).sort((a, b) => b.xp - a.xp).map((u, idx) => ({ ...u, rank: idx + 1 }));

      const newRank = updatedLeaderboard.find(u => u.name === updatedUser.name)?.rank || updatedUser.rank;
      updatedUser.rank = newRank;

      return {
        ...state,
        user: updatedUser,
        leaderboard: updatedLeaderboard,
        levelUpData: levelUp,
        notifications: [notification, ...state.notifications],
        toast: { title: 'XP Earned', amount: action.payload.amount }
      };
    }
    case 'CLEAR_LEVEL_UP':
      return { ...state, levelUpData: null };
    case 'CLEAR_TOAST':
      return { ...state, toast: null };
    case 'COMPLETE_MODULE': {
      const { courseId, moduleId } = action.payload;
      const updatedCourses = state.courses.map(course => {
        if (course.id === courseId) {
          const newCompleted = Math.min(course.completedModules + 1, course.totalModules);
          const progress = Math.round((newCompleted / course.totalModules) * 100);
          return { ...course, completedModules: newCompleted, progress, status: progress === 100 ? 'completed' : 'in-progress' };
        }
        return course;
      });
      return { ...state, courses: updatedCourses };
    }
    case 'UNLOCK_ACHIEVEMENT': {
      const updatedAchievements = state.achievements.map(a => 
        a.id === action.payload ? { ...a, locked: false, progress: a.total || a.progress } : a
      );
      return { ...state, achievements: updatedAchievements };
    }
    case 'READ_NOTIFICATIONS':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };
    case 'RESTORE_STATE':
      return { ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('skillforge_state');
    if (saved) {
      dispatch({ type: 'RESTORE_STATE', payload: JSON.parse(saved) });
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    // skip saving if user is null and not manually logged out
    if (state.user !== undefined) {
      localStorage.setItem('skillforge_state', JSON.stringify(state));
    }
  }, [state]);

  const login = (role) => {
    if (role === 'employee') {
      dispatch({ type: 'LOGIN', payload: { ...mockUser, role: 'employee' } });
    } else {
      dispatch({ 
        type: 'LOGIN', 
        payload: { 
          id: 'hr-001', 
          name: 'HR Admin', 
          firstName: 'Admin', 
          role: 'hr' 
        } 
      });
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addXP = (amount, source) => {
    dispatch({ type: 'ADD_XP', payload: { amount, source } });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, logout, addXP }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
