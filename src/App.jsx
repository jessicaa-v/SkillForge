import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MyLearning from './pages/MyLearning';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';
import Challenges from './pages/Challenges';
import AdminDashboard from './pages/AdminDashboard';
import CourseView from './pages/CourseView';
import Login from './pages/Login';

const ProtectedRoute = ({ children, requireRole }) => {
  const { state } = useAppContext();
  
  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && state.user.role !== requireRole) {
    return <Navigate to={state.user.role === 'hr' ? '/admin' : '/'} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { state } = useAppContext();

  return (
    <Routes>
      <Route path="/login" element={!state.user ? <Login /> : <Navigate to={state.user.role === 'hr' ? '/admin' : '/'} replace />} />
      
      {/* Employee Routes */}
      <Route path="/" element={<ProtectedRoute requireRole="employee"><Layout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="learning" element={<MyLearning />} />
        <Route path="course/:courseId" element={<CourseView />} />
        <Route path="challenges" element={<Challenges />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* HR Routes */}
      <Route path="/admin" element={<ProtectedRoute requireRole="hr"><Layout /></ProtectedRoute>}>
        <Route index element={<AdminDashboard />} />
        <Route path="employees" element={<div className="p-6">Employees (WIP)</div>} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;


