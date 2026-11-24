import { Link } from 'react-router-dom';
import { Users, BookOpen, Trophy, Target, TrendingUp, TrendingDown, ArrowUpRight, MessageSquare, Star } from 'lucide-react';
import { getAllFeedback } from '../utils/feedbackStorage';
import './AdminDashboard.css';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const AdminDashboard = () => {
  const engagementData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 550 },
    { name: 'Thu', value: 450 },
    { name: 'Fri', value: 600 },
    { name: 'Sat', value: 200 },
    { name: 'Sun', value: 150 },
  ];

  const completionData = [
    { name: 'Engineering', completed: 85, pending: 15 },
    { name: 'Sales', completed: 60, pending: 40 },
    { name: 'HR', completed: 95, pending: 5 },
    { name: 'Marketing', completed: 70, pending: 30 },
  ];

  return (
    <div className="admin-dashboard animate-slide-up">
      <div className="page-header">
        <div>
          <h1>HR & Admin Dashboard</h1>
          <p className="page-subtitle">Platform overview and employee learning analytics.</p>
        </div>
        <div className="header-actions">
          <Link to="/admin/feedback" className="btn btn-secondary">
            <MessageSquare size={16} /> Course Evaluations
          </Link>
          <button className="btn btn-secondary">Download Report</button>
          <button className="btn btn-primary">Create Course</button>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon bg-blue-light">
              <Users size={24} className="text-blue" />
            </div>
            <span className="trend-badge positive"><TrendingUp size={14} /> +12%</span>
          </div>
          <div className="admin-stat-info">
            <h3>Total Learners</h3>
            <span className="stat-value">1,248</span>
          </div>
        </div>

        <div className="admin-stat-card card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon bg-purple-light">
              <BookOpen size={24} className="text-purple" />
            </div>
            <span className="trend-badge positive"><TrendingUp size={14} /> +5%</span>
          </div>
          <div className="admin-stat-info">
            <h3>Course Completion</h3>
            <span className="stat-value">68%</span>
          </div>
        </div>

        <div className="admin-stat-card card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon bg-gold-light">
              <Trophy size={24} className="text-gold" />
            </div>
            <span className="trend-badge positive"><TrendingUp size={14} /> +24%</span>
          </div>
          <div className="admin-stat-info">
            <h3>Total XP Earned</h3>
            <span className="stat-value">2.4M</span>
          </div>
        </div>

        <div className="admin-stat-card card">
          <div className="admin-stat-header">
            <div className="admin-stat-icon bg-red-light">
              <Target size={24} className="text-red" />
            </div>
            <span className="trend-badge negative"><TrendingDown size={14} /> -2%</span>
          </div>
          <div className="admin-stat-info">
            <h3>Avg. Quiz Score</h3>
            <span className="stat-value">82%</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card card">
          <div className="section-header">
            <h2>Weekly Engagement</h2>
            <button className="btn-text">View Details <ArrowUpRight size={16} /></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E3A59" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A2235', borderColor: '#2E3A59', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={3} dot={{ r: 4, fill: '#6366F1' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card card">
          <div className="section-header">
            <h2>Compliance by Department</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E3A59" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A2235', borderColor: '#2E3A59', borderRadius: '8px' }}
                />
                <Bar dataKey="completed" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="pending" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <div className="section-header">
          <h2>Recent Gamification Activity</h2>
        </div>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-avatar">SJ</div>
            <div className="activity-content">
              <p><strong>Sarah Jenkins</strong> reached <strong>Level 18</strong></p>
              <span className="activity-time">2 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar bg-purple-avatar">AP</div>
            <div className="activity-content">
              <p><strong>Arjun Patel</strong> unlocked the <strong>Course Crusher</strong> badge</p>
              <span className="activity-time">15 minutes ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-avatar bg-green-avatar">PS</div>
            <div className="activity-content">
              <p><strong>Priya Sharma</strong> completed <strong>Leadership Fundamentals</strong></p>
              <span className="activity-time">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-6">
        <div className="section-header">
          <h2>Recent Course Evaluations</h2>
          <Link to="/admin/feedback" className="btn-text">
            View All Feedback <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="activity-list">
          {getAllFeedback().slice(0, 3).map((f) => (
            <div key={f.id} className="activity-item">
              <div className="activity-avatar bg-purple-avatar">
                {f.userName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="activity-content flex-1">
                <div className="flex justify-between items-center">
                  <p>
                    <strong>{f.userName}</strong> rated <strong>{f.courseTitle}</strong>
                  </p>
                  <div className="flex items-center gap-1 text-gold text-sm font-bold">
                    <Star size={14} fill="currentColor" /> {f.rating}.0
                  </div>
                </div>
                <p className="text-sm text-secondary mt-1">"{f.comments}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
