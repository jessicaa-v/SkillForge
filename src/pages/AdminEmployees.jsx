import { useState } from 'react';
import {
  Users,
  Search,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Award,
  BookOpen,
  X,
  Mail,
  Flame
} from 'lucide-react';
import { adminEmployees, downloadCsv } from '../data/adminMockData';
import './AdminDashboard.css';
import './AdminPages.css';

const AdminEmployees = () => {
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const departments = ['All', ...Array.from(new Set(adminEmployees.map((e) => e.department)))];
  const statuses = ['All', 'Compliant', 'In Review', 'Action Needed'];

  const filteredEmployees = adminEmployees.filter((emp) => {
    const matchesDept = departmentFilter === 'All' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q) ||
      Object.keys(emp.skills).some((s) => s.toLowerCase().includes(q));

    return matchesDept && matchesStatus && matchesSearch;
  });

  const avgProgress = Math.round(
    adminEmployees.reduce((sum, e) => sum + e.learningProgress, 0) / adminEmployees.length
  );
  const compliantCount = adminEmployees.filter((e) => e.status === 'Compliant').length;
  const compliantRate = Math.round((compliantCount / adminEmployees.length) * 100);
  const avgQuizScore = Math.round(
    adminEmployees.reduce((sum, e) => sum + e.avgQuizScore, 0) / adminEmployees.length
  );

  const getTopSkills = (skillsObj) =>
    Object.entries(skillsObj)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

  const handleExportEmployees = () => {
    downloadCsv(
      'skillforge-employee-directory.csv',
      ['Name', 'Role', 'Department', 'Level', 'XP', 'Learning Progress %', 'Completed Courses', 'Compliance Status'],
      filteredEmployees.map((e) => [
        e.name,
        e.role,
        e.department,
        e.level,
        e.xp,
        e.learningProgress,
        `${e.completedCourses}/${e.assignedCourses}`,
        e.status,
      ])
    );
  };

  return (
    <div className="admin-portal animate-slide-up">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <div className="header-pill">
            <Users size={14} className="text-purple" /> TEAM DIRECTORY & SKILL MATRIX
          </div>
          <h1 className="admin-main-title">Employee Directory</h1>
          <p className="admin-sub">
            Browse employees, roles, departments, verified skill proficiencies, and active learning progress.
          </p>
        </div>

        <div className="admin-header-actions">
          <button className="btn btn-secondary" onClick={handleExportEmployees}>
            <FileSpreadsheet size={16} /> Export Directory CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-blue-soft">
              <Users size={22} className="text-blue" />
            </div>
            <span className="tag tag-blue">{departments.length - 1} Teams</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{adminEmployees.length}</h3>
            <span className="kpi-label">Directory Profiles</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Representing 1,248 org learners</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-purple-soft">
              <BookOpen size={22} className="text-purple" />
            </div>
            <span className="trend-chip positive"><TrendingUp size={13} /> Active</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{avgProgress}%</h3>
            <span className="kpi-label">Avg. Learning Progress</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Assigned curriculum completion</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-mint-soft">
              <CheckCircle2 size={22} className="text-mint" />
            </div>
            <span className="trend-chip positive">{compliantCount} of {adminEmployees.length}</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-mint">{compliantRate}%</h3>
            <span className="kpi-label">Compliance Verified</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Mandatory training status</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-gold-soft">
              <Award size={22} className="text-gold" />
            </div>
            <span className="tag tag-gold">Assessments</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-gold">{avgQuizScore}%</h3>
            <span className="kpi-label">Avg. Skill Quiz Score</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Verified proficiency average</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filter-bar">
        <div className="admin-filter-tabs">
          {departments.map((dept) => (
            <button
              key={dept}
              className={`admin-filter-pill ${departmentFilter === dept ? 'active' : ''}`}
              onClick={() => setDepartmentFilter(dept)}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="admin-filter-controls">
          <select
            className="admin-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st === 'All' ? 'All Compliance Statuses' : st}
              </option>
            ))}
          </select>

          <div className="admin-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search name, role, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Employee Directory Table */}
      <div className="card admin-table-card">
        <div className="section-header">
          <div>
            <h2>Workforce Profiles ({filteredEmployees.length})</h2>
            <p className="chart-sub">Click any employee to inspect full skill breakdown and enrolled courses</p>
          </div>
        </div>

        {filteredEmployees.length === 0 ? (
          <div className="p-6 text-center">
            <p>No employees match the current filters.</p>
          </div>
        ) : (
          <div className="admin-data-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Top Skills</th>
                  <th>Learning Progress</th>
                  <th>Level & XP</th>
                  <th>Compliance</th>
                  <th>Profile</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    onClick={() => setSelectedEmployee(emp)}
                    style={{ cursor: 'pointer' }}
                  >
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
                    <td>
                      <div className="skill-mini-pills">
                        {getTopSkills(emp.skills).map(([skillName, score]) => (
                          <span key={skillName} className="skill-mini-pill">
                            {skillName}: <strong>{score}%</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ minWidth: '180px' }}>
                      <div className="flex justify-between items-center mb-1" style={{ fontSize: '0.76rem', fontWeight: 700 }}>
                        <span>{emp.completedCourses}/{emp.assignedCourses} courses</span>
                        <strong>{emp.learningProgress}%</strong>
                      </div>
                      <div className="progress-bar-bg small">
                        <div
                          className={`progress-bar-fill ${emp.learningProgress >= 80 ? 'bg-green' : emp.learningProgress >= 65 ? 'bg-blue' : 'bg-coral'}`}
                          style={{ width: `${emp.learningProgress}%` }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="emp-lvl-pill" style={{ width: 'fit-content' }}>Lvl {emp.level}</span>
                        <span className="emp-xp-number mt-1">{emp.xp.toLocaleString()} XP</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-pill pill-${emp.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-text"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEmployee(emp);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedEmployee(null)}>
          <div className="admin-modal-card animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="flex items-center gap-3">
                <div
                  className="emp-avatar-circle"
                  style={{ width: '48px', height: '48px', fontSize: '1rem', marginRight: 0 }}
                >
                  {selectedEmployee.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h2>{selectedEmployee.name}</h2>
                  <p className="chart-sub">{selectedEmployee.role} • {selectedEmployee.department}</p>
                  <span className="flex items-center gap-1 mt-1" style={{ fontSize: '0.76rem', color: 'var(--color-text-muted)' }}>
                    <Mail size={12} /> {selectedEmployee.email}
                  </span>
                </div>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedEmployee(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="admin-course-stats-row">
              <div className="course-mini-stat">
                <span>Level & XP</span>
                <strong>Lvl {selectedEmployee.level} ({selectedEmployee.xp.toLocaleString()})</strong>
              </div>
              <div className="course-mini-stat">
                <span>Learning Progress</span>
                <strong>{selectedEmployee.learningProgress}% ({selectedEmployee.completedCourses}/{selectedEmployee.assignedCourses})</strong>
              </div>
              <div className="course-mini-stat">
                <span>Active Streak</span>
                <strong className="flex items-center gap-1"><Flame size={14} className="text-coral" /> {selectedEmployee.streak} Days</strong>
              </div>
            </div>

            <div className="skill-gap-item">
              <div className="skill-gap-top">
                <span className="skill-gap-title">Skill Proficiency Breakdown</span>
                <span className={`status-pill pill-${selectedEmployee.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {selectedEmployee.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-1">
                {Object.entries(selectedEmployee.skills).map(([skill, val]) => (
                  <div key={skill}>
                    <div className="flex justify-between" style={{ fontSize: '0.78rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      <span>{skill}</span>
                      <strong>{val}%</strong>
                    </div>
                    <div className="progress-bar-bg small">
                      <div
                        className={`progress-bar-fill ${val >= 85 ? 'bg-green' : val >= 70 ? 'bg-purple' : 'bg-coral'}`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-gap-item">
              <span className="skill-gap-title">Recent Course Enrolments</span>
              <div className="flex flex-col gap-2 mt-1">
                {selectedEmployee.courses.map((c) => (
                  <div key={c.title} className="flex justify-between items-center" style={{ fontSize: '0.84rem' }}>
                    <span>{c.title}</span>
                    <span className={`tag ${c.status === 'Completed' ? 'tag-green' : c.status === 'In Progress' ? 'tag-blue' : 'tag-coral'}`}>
                      {c.status} ({c.progress}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="skill-mini-pills">
                {selectedEmployee.achievements.map((a) => (
                  <span key={a} className="tag tag-gold">{a}</span>
                ))}
              </div>
              <button className="btn btn-primary" onClick={() => setSelectedEmployee(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmployees;
