import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FolderOpen,
  Plus,
  Search,
  BookOpen,
  Users,
  CheckCircle2,
  Star,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { adminCourseDetailsMap } from '../data/adminMockData';
import './AdminDashboard.css';
import './AdminPages.css';

const HR_CUSTOM_COURSES_KEY = 'skillforge_hr_custom_courses';

const AdminCourses = () => {
  const { state } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [requirementFilter, setRequirementFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(searchParams.get('create') === '1');

  const [customCourses, setCustomCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(HR_CUSTOM_COURSES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Communication',
    difficulty: 'Beginner',
    time: '1h 30m',
    totalModules: 5,
    xpReward: 500,
    instructor: 'HR Learning Team',
    mandatory: false,
    description: '',
  });

  useEffect(() => {
    if (searchParams.get('create') === '1') {
      setShowCreateModal(true);
    }
  }, [searchParams]);

  const baseCourses = state.courses || [];
  const allCourses = [...baseCourses, ...customCourses].map((course) => {
    const meta = adminCourseDetailsMap[course.id] || {
      description: course.description || 'Structured corporate training program designed to build practical role capabilities.',
      instructor: course.instructor || 'HR Learning Team',
      mandatory: Boolean(course.mandatory),
      enrolled: course.enrolled || 180,
      completed: course.completed || 92,
      inProgress: course.inProgress || 64,
      notStarted: course.notStarted || 24,
      avgScore: course.avgScore || 86,
      targetDepts: course.targetDepts || ['All Teams'],
    };
    const completionPct = meta.enrolled > 0 ? Math.round((meta.completed / meta.enrolled) * 100) : 0;
    return {
      ...course,
      ...meta,
      completionPct,
    };
  });

  const categories = ['All', ...Array.from(new Set(allCourses.map((c) => c.category)))];

  const filteredCourses = allCourses.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesReq =
      requirementFilter === 'all' ||
      (requirementFilter === 'mandatory' && course.mandatory) ||
      (requirementFilter === 'elective' && !course.mandatory);
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      course.title.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.description.toLowerCase().includes(q) ||
      course.instructor.toLowerCase().includes(q);

    return matchesCategory && matchesReq && matchesSearch;
  });

  const totalEnrolments = allCourses.reduce((sum, c) => sum + c.enrolled, 0);
  const avgCompletionRate = Math.round(
    allCourses.reduce((sum, c) => sum + c.completionPct, 0) / (allCourses.length || 1)
  );
  const mandatoryCount = allCourses.filter((c) => c.mandatory).length;

  const closeCreateModal = () => {
    setShowCreateModal(false);
    if (searchParams.get('create')) {
      setSearchParams({});
    }
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;

    const created = {
      id: `hr-c-${Date.now()}`,
      title: newCourse.title.trim(),
      category: newCourse.category,
      difficulty: newCourse.difficulty,
      time: newCourse.time || '1h 30m',
      totalModules: Number(newCourse.totalModules) || 5,
      xpReward: Number(newCourse.xpReward) || 500,
      rating: 4.8,
      instructor: newCourse.instructor || 'HR Learning Team',
      mandatory: newCourse.mandatory,
      description: newCourse.description.trim() || 'Newly published corporate skill development curriculum.',
      enrolled: 120,
      completed: 18,
      inProgress: 54,
      notStarted: 48,
      avgScore: 88,
      targetDepts: ['Company-Wide'],
    };

    const updated = [created, ...customCourses];
    setCustomCourses(updated);
    localStorage.setItem(HR_CUSTOM_COURSES_KEY, JSON.stringify(updated));
    setNewCourse({
      title: '',
      category: 'Communication',
      difficulty: 'Beginner',
      time: '1h 30m',
      totalModules: 5,
      xpReward: 500,
      instructor: 'HR Learning Team',
      mandatory: false,
      description: '',
    });
    closeCreateModal();
  };

  return (
    <div className="admin-portal animate-slide-up">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <div className="header-pill">
            <FolderOpen size={14} className="text-purple" /> CURRICULUM CATALOG & ENROLMENTS
          </div>
          <h1 className="admin-main-title">Courses Management</h1>
          <p className="admin-sub">
            Manage corporate course listings, categories, descriptions, employee enrolments, and completion status.
          </p>
        </div>

        <div className="admin-header-actions">
          <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
            <Plus size={16} /> Create Course
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-purple-soft">
              <BookOpen size={22} className="text-purple" />
            </div>
            <span className="tag tag-purple">Published</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{allCourses.length}</h3>
            <span className="kpi-label">Active Courses in Catalog</span>
          </div>
          <div className="kpi-footer-metric">
            <span>{categories.length - 1} learning categories</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-blue-soft">
              <Users size={22} className="text-blue" />
            </div>
            <span className="trend-chip positive">Active Seats</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{totalEnrolments.toLocaleString()}</h3>
            <span className="kpi-label">Total Course Enrolments</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Across all departments</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-mint-soft">
              <CheckCircle2 size={22} className="text-mint" />
            </div>
            <span className="trend-chip positive">Healthy</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-mint">{avgCompletionRate}%</h3>
            <span className="kpi-label">Avg. Course Completion</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Organization-wide benchmark</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-gold-soft">
              <ShieldCheck size={22} className="text-gold" />
            </div>
            <span className="tag tag-coral">Required</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-gold">{mandatoryCount}</h3>
            <span className="kpi-label">Mandatory Courses</span>
          </div>
          <div className="kpi-footer-metric">
            <span>{allCourses.length - mandatoryCount} elective skill courses</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="admin-filter-bar">
        <div className="admin-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`admin-filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="admin-filter-controls">
          <select
            className="admin-select"
            value={requirementFilter}
            onChange={(e) => setRequirementFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="mandatory">Mandatory Only</option>
            <option value="elective">Elective Only</option>
          </select>

          <div className="admin-search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search courses or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length === 0 ? (
        <div className="card p-6 text-center">
          <h3>No matching courses found</h3>
          <p className="mt-2">Try clearing your category filter or search term.</p>
        </div>
      ) : (
        <div className="admin-courses-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card card-hover admin-course-card">
              <div className="flex flex-col gap-3">
                <div className="admin-course-top-row">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="tag tag-purple">{course.category}</span>
                    <span className={`tag ${course.mandatory ? 'tag-coral' : 'tag-blue'}`}>
                      {course.mandatory ? 'Mandatory' : 'Elective'}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 font-bold" style={{ color: '#B45309', fontSize: '0.85rem' }}>
                    <Star size={14} fill="#FFC857" color="#FFC857" /> {course.rating || 4.8}
                  </span>
                </div>

                <div>
                  <h3 className="admin-course-title">{course.title}</h3>
                  <p className="admin-course-desc mt-2">{course.description}</p>
                </div>

                <div className="flex items-center gap-4 flex-wrap" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                  <span><Clock size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {course.time}</span>
                  <span>{course.totalModules} Modules</span>
                  <span>{course.difficulty}</span>
                  <span>Lead: {course.instructor}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="admin-course-stats-row">
                  <div className="course-mini-stat">
                    <span>Enrolled</span>
                    <strong>{course.enrolled.toLocaleString()}</strong>
                  </div>
                  <div className="course-mini-stat">
                    <span>Completed</span>
                    <strong className="text-mint">{course.completed.toLocaleString()}</strong>
                  </div>
                  <div className="course-mini-stat">
                    <span>In Progress</span>
                    <strong className="text-purple">{course.inProgress.toLocaleString()}</strong>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>Completion Status</span>
                    <span style={{ color: course.completionPct >= 80 ? '#15803D' : 'var(--color-primary)' }}>
                      {course.completionPct}% Completed
                    </span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div
                      className={`progress-bar-fill ${course.completionPct >= 80 ? 'bg-green' : course.completionPct >= 65 ? 'bg-blue' : 'bg-gold'}`}
                      style={{ width: `${course.completionPct}%` }}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-secondary w-full"
                  onClick={() => setSelectedCourseModal(course)}
                >
                  View Enrolment Breakdown
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enrolment Details Modal */}
      {selectedCourseModal && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedCourseModal(null)}>
          <div className="admin-modal-card animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="tag tag-purple">{selectedCourseModal.category}</span>
                <h2 className="mt-2">{selectedCourseModal.title}</h2>
                <p className="chart-sub">Instructor: {selectedCourseModal.instructor} • {selectedCourseModal.totalModules} modules ({selectedCourseModal.time})</p>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedCourseModal(null)}>
                <X size={18} />
              </button>
            </div>

            <p className="admin-course-desc">{selectedCourseModal.description}</p>

            <div className="admin-course-stats-row">
              <div className="course-mini-stat">
                <span>Total Enrolled</span>
                <strong>{selectedCourseModal.enrolled}</strong>
              </div>
              <div className="course-mini-stat">
                <span>Completed</span>
                <strong>{selectedCourseModal.completed} ({selectedCourseModal.completionPct}%)</strong>
              </div>
              <div className="course-mini-stat">
                <span>Not Started</span>
                <strong>{selectedCourseModal.notStarted}</strong>
              </div>
            </div>

            <div className="skill-gap-item">
              <div className="skill-gap-top">
                <span className="skill-gap-title">Target Departments</span>
                <span className="tag tag-green">Avg Quiz Score: {selectedCourseModal.avgScore}%</span>
              </div>
              <div className="skill-mini-pills">
                {(selectedCourseModal.targetDepts || ['All Teams']).map((d) => (
                  <span key={d} className="skill-mini-pill">{d}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={() => setSelectedCourseModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="admin-modal-backdrop" onClick={closeCreateModal}>
          <div className="admin-modal-card animate-pop" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <span className="tag tag-purple">NEW CURRICULUM</span>
                <h2 className="mt-2">Create Training Course</h2>
                <p className="chart-sub">Publish a new course listing to the HR catalog</p>
              </div>
              <button className="admin-modal-close" onClick={closeCreateModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="admin-form-grid">
              <div className="admin-form-field full">
                <label>Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., AI Productivity & Ethics"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="admin-form-field">
                <label>Category</label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, category: e.target.value }))}
                >
                  <option value="Communication">Communication</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Onboarding">Onboarding</option>
                  <option value="Performance">Performance</option>
                  <option value="Technical">Technical</option>
                </select>
              </div>

              <div className="admin-form-field">
                <label>Difficulty</label>
                <select
                  value={newCourse.difficulty}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, difficulty: e.target.value }))}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="admin-form-field">
                <label>Estimated Duration</label>
                <input
                  type="text"
                  value={newCourse.time}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, time: e.target.value }))}
                />
              </div>

              <div className="admin-form-field">
                <label>Modules Count</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newCourse.totalModules}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, totalModules: e.target.value }))}
                />
              </div>

              <div className="admin-form-field">
                <label>Instructor</label>
                <input
                  type="text"
                  value={newCourse.instructor}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, instructor: e.target.value }))}
                />
              </div>

              <div className="admin-form-field">
                <label>Requirement Type</label>
                <select
                  value={newCourse.mandatory ? 'mandatory' : 'elective'}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, mandatory: e.target.value === 'mandatory' }))}
                >
                  <option value="elective">Elective</option>
                  <option value="mandatory">Mandatory</option>
                </select>
              </div>

              <div className="admin-form-field full">
                <label>Course Description</label>
                <textarea
                  rows="3"
                  placeholder="Describe the learning objectives and target audience..."
                  value={newCourse.description}
                  onChange={(e) => setNewCourse((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="admin-form-field full flex justify-end gap-3" style={{ flexDirection: 'row' }}>
                <button type="button" className="btn btn-secondary" onClick={closeCreateModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
