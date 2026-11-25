import { useState } from 'react';
import {
  PieChart as PieChartIcon,
  FileSpreadsheet,
  TrendingUp,
  Clock,
  CheckCircle2,
  Award,
  Users,
  BookOpen,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useAppContext } from '../context/AppContext';
import {
  departmentAnalytics,
  workforceReportTrends,
  adminCourseDetailsMap,
  adminEmployees,
  downloadCsv
} from '../data/adminMockData';
import './AdminDashboard.css';
import './AdminPages.css';

const AdminReports = () => {
  const { state } = useAppContext();
  const [selectedDept, setSelectedDept] = useState('All');
  const [activeReportTab, setActiveReportTab] = useState('workforce');

  const courses = state.courses || [];
  const departments = ['All', ...departmentAnalytics.map((d) => d.department)];

  const filteredDepartments = selectedDept === 'All'
    ? departmentAnalytics
    : departmentAnalytics.filter((d) => d.department === selectedDept);

  const filteredEmployees = selectedDept === 'All'
    ? adminEmployees
    : adminEmployees.filter((e) => e.department === selectedDept);

  const courseReports = courses.map((course) => {
    const meta = adminCourseDetailsMap[course.id] || {
      mandatory: false,
      enrolled: 320,
      completed: 198,
      inProgress: 84,
      notStarted: 38,
      avgScore: 84,
    };
    const completionPct = meta.enrolled > 0 ? Math.round((meta.completed / meta.enrolled) * 100) : 0;
    return {
      ...course,
      ...meta,
      completionPct,
    };
  });

  const totalHours = workforceReportTrends[workforceReportTrends.length - 1].trainingHours;
  const avgPerformance = Math.round(
    filteredDepartments.reduce((sum, d) => sum + d.performanceIndex, 0) / (filteredDepartments.length || 1)
  );
  const avgCompliance = Math.round(
    filteredDepartments.reduce((sum, d) => sum + d.complianceRate, 0) / (filteredDepartments.length || 1)
  );
  const totalCompletions = courseReports.reduce((sum, c) => sum + c.completed, 0);

  const handleExportReport = () => {
    if (activeReportTab === 'courses') {
      downloadCsv(
        'skillforge-course-completion-report.csv',
        ['Course', 'Category', 'Mandatory', 'Enrolled', 'Completed', 'In Progress', 'Completion %', 'Avg Quiz Score %'],
        courseReports.map((c) => [
          c.title,
          c.category,
          c.mandatory ? 'Mandatory' : 'Elective',
          c.enrolled,
          c.completed,
          c.inProgress,
          c.completionPct,
          c.avgScore,
        ])
      );
      return;
    }

    if (activeReportTab === 'performance') {
      downloadCsv(
        'skillforge-employee-performance-report.csv',
        ['Employee', 'Role', 'Department', 'Courses Completed', 'Training Hours', 'Avg Quiz Score %', 'Performance Score %', 'Status'],
        filteredEmployees.map((e) => [
          e.name,
          e.role,
          e.department,
          `${e.completedCourses}/${e.assignedCourses}`,
          e.trainingHours,
          e.avgQuizScore,
          e.performanceRating,
          e.status,
        ])
      );
      return;
    }

    downloadCsv(
      'skillforge-workforce-report.csv',
      ['Department', 'Headcount', 'Active Learners', 'Avg Completion %', 'Avg Assessment %', 'Performance Index', 'Hours/Emp', 'Compliance %'],
      filteredDepartments.map((d) => [
        d.department,
        d.headcount,
        d.activeLearners,
        d.avgCompletion,
        d.avgScore,
        d.performanceIndex,
        d.trainingHoursPerEmp,
        d.complianceRate,
      ])
    );
  };

  return (
    <div className="admin-portal animate-slide-up">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <div className="header-pill">
            <PieChartIcon size={14} className="text-purple" /> WORKFORCE REPORTS & PERFORMANCE
          </div>
          <h1 className="admin-main-title">Training & Performance Reports</h1>
          <p className="admin-sub">
            Exportable workforce reports, employee performance benchmarks, and course completion metrics.
          </p>
        </div>

        <div className="admin-header-actions">
          <button className="btn btn-primary" onClick={handleExportReport}>
            <Download size={16} /> Export Report CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-purple-soft">
              <Clock size={22} className="text-purple" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +11.8% MoM</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{totalHours.toLocaleString()} hrs</h3>
            <span className="kpi-label">Monthly Training Volume</span>
          </div>
          <div className="kpi-footer-metric">
            <span>November reporting cycle</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-gold-soft">
              <Award size={22} className="text-gold" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +3.4 pts</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-gold">{avgPerformance}%</h3>
            <span className="kpi-label">Avg. Performance Index</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Scope: {selectedDept === 'All' ? 'All 6 departments' : selectedDept}</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-mint-soft">
              <CheckCircle2 size={22} className="text-mint" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> On target</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-mint">{avgCompliance}%</h3>
            <span className="kpi-label">Mandatory Compliance Rate</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Q4 audit readiness score</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-blue-soft">
              <BookOpen size={22} className="text-blue" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> +14% Q4</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{totalCompletions.toLocaleString()}</h3>
            <span className="kpi-label">Total Course Completions</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Across {courseReports.length} active courses</span>
          </div>
        </div>
      </div>

      {/* Report Selector & Department Filter */}
      <div className="admin-filter-bar">
        <div className="admin-filter-tabs">
          <button
            className={`admin-filter-pill ${activeReportTab === 'workforce' ? 'active' : ''}`}
            onClick={() => setActiveReportTab('workforce')}
          >
            Workforce Summary
          </button>
          <button
            className={`admin-filter-pill ${activeReportTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveReportTab('performance')}
          >
            Employee Performance
          </button>
          <button
            className={`admin-filter-pill ${activeReportTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveReportTab('courses')}
          >
            Course Completion Reports
          </button>
        </div>

        <div className="admin-filter-controls">
          <span className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>Department:</span>
          <select
            className="admin-select"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Charts Row */}
      <div className="admin-charts-grid">
        <div className="chart-wrapper-card card">
          <div className="section-header">
            <div>
              <h2>Monthly Learning Velocity</h2>
              <p className="chart-sub">Total training hours logged across the past 5 months</p>
            </div>
            <span className="tag tag-purple">5-Month Trend</span>
          </div>

          <div className="chart-canvas-box">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={workforceReportTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E5D8" vertical={false} />
                <XAxis dataKey="month" stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <YAxis stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#EFE4D6',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(44, 33, 66, 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="trainingHours"
                  name="Training Hours"
                  stroke="#7656E8"
                  strokeWidth={4}
                  dot={{ r: 5, fill: '#7656E8', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper-card card">
          <div className="section-header">
            <div>
              <h2>Department Performance vs Completion</h2>
              <p className="chart-sub">Performance index compared with course completion %</p>
            </div>
            <div className="chart-legend-row">
              <span className="dot-leg done"></span> Performance
              <span className="dot-leg pending"></span> Completion
            </div>
          </div>

          <div className="chart-canvas-box">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={filteredDepartments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E5D8" vertical={false} />
                <XAxis dataKey="department" stroke="#6B6183" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis domain={[0, 100]} stroke="#6B6183" tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#EFE4D6',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(44, 33, 66, 0.1)'
                  }}
                />
                <Bar dataKey="performanceIndex" name="Performance Index" fill="#50C9A7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avgCompletion" name="Completion %" fill="#63B8F5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Report Tables based on active tab */}
      {activeReportTab === 'workforce' && (
        <div className="card admin-table-card">
          <div className="section-header">
            <div>
              <h2><Users size={19} className="text-purple" /> Workforce Department Report</h2>
              <p className="chart-sub">Headcount engagement, training investment, and compliance breakdown</p>
            </div>
            <button className="btn-text" onClick={handleExportReport}>
              <FileSpreadsheet size={15} /> Download CSV
            </button>
          </div>

          <div className="admin-data-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Active / Total</th>
                  <th>Avg. Completion</th>
                  <th>Avg. Quiz Score</th>
                  <th>Performance Index</th>
                  <th>Hours / Emp</th>
                  <th>Compliance</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.map((dept) => (
                  <tr key={dept.department}>
                    <td><strong>{dept.department}</strong></td>
                    <td>{dept.activeLearners} / {dept.headcount}</td>
                    <td>{dept.avgCompletion}%</td>
                    <td>{dept.avgScore}%</td>
                    <td>
                      <span className="tag tag-purple">{dept.performanceIndex} / 100</span>
                    </td>
                    <td>{dept.trainingHoursPerEmp} hrs</td>
                    <td>
                      <span className={`status-pill ${dept.complianceRate >= 90 ? 'pill-compliant' : dept.complianceRate >= 80 ? 'pill-in-review' : 'pill-action-needed'}`}>
                        {dept.complianceRate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeReportTab === 'performance' && (
        <div className="card admin-table-card">
          <div className="section-header">
            <div>
              <h2><Award size={19} className="text-gold" /> Employee Performance & Assessment Report</h2>
              <p className="chart-sub">Individual learning velocity, quiz scores, and performance tiers</p>
            </div>
            <button className="btn-text" onClick={handleExportReport}>
              <FileSpreadsheet size={15} /> Download CSV
            </button>
          </div>

          <div className="admin-data-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Courses Done</th>
                  <th>Training Hours</th>
                  <th>Avg. Quiz Score</th>
                  <th>Performance Rating</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="flex items-center">
                        <div className="emp-avatar-circle">{emp.name.split(' ').map((n) => n[0]).join('')}</div>
                        <div>
                          <span className="emp-name-text">{emp.name}</span>
                          <span className="emp-role-sub">{emp.role}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="emp-dept-badge">{emp.department}</span></td>
                    <td>{emp.completedCourses} / {emp.assignedCourses}</td>
                    <td>{emp.trainingHours} hrs</td>
                    <td><strong>{emp.avgQuizScore}%</strong></td>
                    <td>
                      <span className={`tag ${emp.performanceRating >= 90 ? 'tag-green' : emp.performanceRating >= 80 ? 'tag-blue' : 'tag-coral'}`}>
                        {emp.performanceRating}% {emp.performanceRating >= 90 ? 'Exceeds' : emp.performanceRating >= 80 ? 'Meets' : 'Needs Coaching'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill pill-${emp.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeReportTab === 'courses' && (
        <div className="card admin-table-card">
          <div className="section-header">
            <div>
              <h2><BookOpen size={19} className="text-mint" /> Training & Course Completion Report</h2>
              <p className="chart-sub">Enrollment funnel, completion status, and assessment averages per course</p>
            </div>
            <button className="btn-text" onClick={handleExportReport}>
              <FileSpreadsheet size={15} /> Download CSV
            </button>
          </div>

          <div className="admin-data-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Requirement</th>
                  <th>Enrolled</th>
                  <th>Completed</th>
                  <th>Completion Status</th>
                  <th>Avg. Score</th>
                </tr>
              </thead>
              <tbody>
                {courseReports.map((course) => (
                  <tr key={course.id}>
                    <td><strong>{course.title}</strong></td>
                    <td><span className="tag tag-purple">{course.category}</span></td>
                    <td>
                      <span className={`tag ${course.mandatory ? 'tag-coral' : 'tag-blue'}`}>
                        {course.mandatory ? 'Mandatory' : 'Elective'}
                      </span>
                    </td>
                    <td>{course.enrolled.toLocaleString()}</td>
                    <td>{course.completed.toLocaleString()}</td>
                    <td style={{ minWidth: '170px' }}>
                      <div className="flex items-center gap-2">
                        <div className="progress-bar-bg small" style={{ flex: 1 }}>
                          <div
                            className={`progress-bar-fill ${course.completionPct >= 80 ? 'bg-green' : course.completionPct >= 65 ? 'bg-blue' : 'bg-gold'}`}
                            style={{ width: `${course.completionPct}%` }}
                          />
                        </div>
                        <strong>{course.completionPct}%</strong>
                      </div>
                    </td>
                    <td><strong>{course.avgScore}%</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
