import { 
  Users, 
  BookOpen, 
  Trophy, 
  Target, 
  TrendingUp, 
  ArrowUpRight, 
  FileSpreadsheet, 
  Plus, 
  Sparkles,
  Clock
} from 'lucide-react';
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
import './AdminDashboard.css';

const AdminDashboard = () => {
  const engagementData = [
    { name: 'Mon', value: 420 },
    { name: 'Tue', value: 380 },
    { name: 'Wed', value: 590 },
    { name: 'Thu', value: 480 },
    { name: 'Fri', value: 650 },
    { name: 'Sat', value: 240 },
    { name: 'Sun', value: 190 },
  ];

  const completionData = [
    { name: 'Engineering', completed: 85, pending: 15 },
    { name: 'Product', completed: 78, pending: 22 },
    { name: 'HR', completed: 95, pending: 5 },
    { name: 'Marketing', completed: 72, pending: 28 },
    { name: 'Sales', completed: 62, pending: 38 },
  ];

  const recentEmployees = [
    { name: 'Sarah Jenkins', role: 'Staff Engineer', dept: 'Engineering', level: 18, xp: '12,450', status: 'Compliant' },
    { name: 'Arjun Patel', role: 'Product Lead', dept: 'Product', level: 16, xp: '11,820', status: 'Compliant' },
    { name: 'Priya Sharma', role: 'Marketing Mgr', dept: 'Marketing', level: 15, xp: '10,950', status: 'In Review' },
    { name: 'Alex Thorne', role: 'Product Designer', dept: 'Product', level: 12, xp: '8,420', status: 'Compliant' },
    { name: 'Marcus Chen', role: 'Account Exec', dept: 'Sales', level: 12, xp: '8,740', status: 'Action Needed' },
  ];

  return (
    <div className="admin-portal animate-slide-up">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <div className="header-pill">
            <Trophy size={14} className="text-purple" /> WORKFORCE ANALYTICS & HR INTELLIGENCE
          </div>
          <h1 className="admin-main-title">HR Management Portal</h1>
          <p className="admin-sub">Monitor organization-wide curriculum health, gamified training velocity, and compliance.</p>
        </div>

        <div className="admin-header-actions">
          <button className="btn btn-secondary">
            <FileSpreadsheet size={16} /> Export CSV
          </button>
          <button className="btn btn-primary">
            <Plus size={16} /> Create Course
          </button>
        </div>
      </div>

      {/* 4 STATS CARDS */}
      <div className="admin-kpi-grid">
        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-blue-soft">
              <Users size={22} className="text-blue" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +12% this mo.</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">1,248</h3>
            <span className="kpi-label">Active Learners Enrolled</span>
          </div>
          <div className="kpi-footer-metric">
            <span>98.2% monthly active rate</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-purple-soft">
              <BookOpen size={22} className="text-purple" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +5% completion</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">68.4%</h3>
            <span className="kpi-label">Avg. Course Completion</span>
          </div>
          <div className="kpi-footer-metric">
            <span>+4.2% vs previous quarter</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-gold-soft">
              <Sparkles size={22} className="text-gold" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +24% activity</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-gold">2.48M</h3>
            <span className="kpi-label">Total Employee XP Earned</span>
          </div>
          <div className="kpi-footer-metric">
            <span>1,420 daily quest completions</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-mint-soft">
              <Target size={22} className="text-mint" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> 94% pass rate</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-mint">84.2%</h3>
            <span className="kpi-label">Avg. Assessment Score</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Security Compliance 96%</span>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="admin-charts-grid">
        {/* Weekly Engagement Line Chart */}
        <div className="chart-wrapper-card card">
          <div className="section-header">
            <div>
              <h2>Weekly Engagement Trends</h2>
              <p className="chart-sub">Daily learning hours completed across all teams</p>
            </div>
            <span className="tag tag-purple">Real-time</span>
          </div>

          <div className="chart-canvas-box">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E5D8" vertical={false} />
                <XAxis dataKey="name" stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#EFE4D6', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(44, 33, 66, 0.1)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 700
                  }}
                  itemStyle={{ color: '#7656E8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#7656E8" 
                  strokeWidth={4} 
                  dot={{ r: 5, fill: '#7656E8', stroke: '#FFFFFF', strokeWidth: 2 }} 
                  activeDot={{ r: 8, fill: '#FFC857' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Compliance by Department Bar Chart */}
        <div className="chart-wrapper-card card">
          <div className="section-header">
            <div>
              <h2>Department Compliance & Completion</h2>
              <p className="chart-sub">Completed vs pending mandatory training</p>
            </div>
            <div className="chart-legend-row">
              <span className="dot-leg done"></span> Completed
              <span className="dot-leg pending"></span> Pending
            </div>
          </div>

          <div className="chart-canvas-box">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E5D8" vertical={false} />
                <XAxis dataKey="name" stroke="#6B6183" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    borderColor: '#EFE4D6', 
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(44, 33, 66, 0.1)',
                    fontFamily: 'var(--font-sans)'
                  }} 
                />
                <Bar dataKey="completed" stackId="a" fill="#50C9A7" radius={[0, 0, 4, 4]} />
                <Bar dataKey="pending" stackId="a" fill="#63B8F5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: EMPLOYEE DIRECTORY PREVIEW & ACTIVITY STREAM */}
      <div className="admin-bottom-grid">
        {/* EMPLOYEE OVERVIEW TABLE */}
        <div className="card admin-table-card">
          <div className="section-header">
            <div>
              <h2>Learner Roster & Status</h2>
              <p className="chart-sub">Recent employee progress and compliance validation</p>
            </div>
            <button className="btn-text">View All Directory <ArrowUpRight size={16} /></button>
          </div>

          <div className="admin-roster-table">
            <div className="roster-thead">
              <div className="r-cell r-name">Employee</div>
              <div className="r-cell r-dept">Department</div>
              <div className="r-cell r-lvl">Level</div>
              <div className="r-cell r-xp">XP Earned</div>
              <div className="r-cell r-status">Compliance</div>
            </div>

            <div className="roster-tbody">
              {recentEmployees.map((emp, i) => (
                <div key={i} className="roster-row">
                  <div className="r-cell r-name">
                    <div className="emp-avatar-circle">{emp.name.split(' ').map(n=>n[0]).join('')}</div>
                    <div>
                      <span className="emp-name-text">{emp.name}</span>
                      <span className="emp-role-sub">{emp.role}</span>
                    </div>
                  </div>
                  <div className="r-cell r-dept">
                    <span className="emp-dept-badge">{emp.dept}</span>
                  </div>
                  <div className="r-cell r-lvl">
                    <span className="emp-lvl-pill">Lvl {emp.level}</span>
                  </div>
                  <div className="r-cell r-xp">
                    <span className="emp-xp-number">{emp.xp} XP</span>
                  </div>
                  <div className="r-cell r-status">
                    <span className={`status-pill pill-${emp.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {emp.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIVITY STREAM */}
        <div className="card admin-activity-card">
          <div className="section-header">
            <h2>Live Gamification Stream</h2>
            <span className="pulse-dot"></span>
          </div>

          <div className="stream-list">
            <div className="stream-item">
              <div className="stream-avatar bg-purple">SJ</div>
              <div className="stream-info">
                <p><strong>Sarah Jenkins</strong> reached <strong>Level 18</strong></p>
                <span className="stream-time"><Clock size={12} /> 2 mins ago</span>
              </div>
            </div>

            <div className="stream-item">
              <div className="stream-avatar bg-gold">AP</div>
              <div className="stream-info">
                <p><strong>Arjun Patel</strong> unlocked <strong>Course Crusher</strong> badge</p>
                <span className="stream-time"><Clock size={12} /> 14 mins ago</span>
              </div>
            </div>

            <div className="stream-item">
              <div className="stream-avatar bg-mint">PS</div>
              <div className="stream-info">
                <p><strong>Priya Sharma</strong> completed <strong>Leadership Fundamentals</strong></p>
                <span className="stream-time"><Clock size={12} /> 45 mins ago</span>
              </div>
            </div>

            <div className="stream-item">
              <div className="stream-avatar bg-blue">AT</div>
              <div className="stream-info">
                <p><strong>Alex Thorne</strong> maintained a <strong>7-Day Streak</strong> 🔥</p>
                <span className="stream-time"><Clock size={12} /> 1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
