import { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Users, 
  TrendingUp, 
  Search 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getAllFeedback, getCourseFeedbackSummary } from '../utils/feedbackStorage';
import './AdminFeedback.css';

const AdminFeedback = () => {
  const { state } = useAppContext();
  const courses = state.courses || [];
  const [selectedCourseId, setSelectedCourseId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allFeedbacks = getAllFeedback();

  // Calculate high-level KPIs across all feedback
  const totalReviewsCount = allFeedbacks.length;
  const overallAvgRating = totalReviewsCount > 0 
    ? Number((allFeedbacks.reduce((acc, f) => acc + (f.rating || 5), 0) / totalReviewsCount).toFixed(1))
    : 4.8;

  const clarityPositiveCount = allFeedbacks.filter(
    (f) => f.q1Clarity?.includes('Clear') || f.q1Clarity?.includes('Structured')
  ).length;
  const overallClarityRate = totalReviewsCount > 0
    ? Math.round((clarityPositiveCount / totalReviewsCount) * 100)
    : 95;

  const recommendPositiveCount = allFeedbacks.filter(
    (f) => f.q3Recommendation?.includes('Recommend') || f.q3Recommendation?.includes('Likely')
  ).length;
  const overallRecommendRate = totalReviewsCount > 0
    ? Math.round((recommendPositiveCount / totalReviewsCount) * 100)
    : 98;

  // Filter courses based on dropdown
  const filteredCourses = selectedCourseId === 'all'
    ? courses
    : courses.filter((c) => c.id === selectedCourseId);

  return (
    <div className="admin-feedback-page animate-slide-up">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Course Evaluations & Feedback</h1>
          <p className="page-subtitle">Analyze employee ratings, curriculum clarity scores, and qualitative feedback.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="feedback-kpi-grid">
        <div className="feedback-kpi-card card">
          <div className="feedback-kpi-icon gold">
            <Star size={26} fill="currentColor" />
          </div>
          <div className="feedback-kpi-content">
            <span className="feedback-kpi-value">{overallAvgRating} / 5.0</span>
            <span className="feedback-kpi-label">Average LMS Rating</span>
          </div>
        </div>

        <div className="feedback-kpi-card card">
          <div className="feedback-kpi-icon blue">
            <MessageSquare size={26} />
          </div>
          <div className="feedback-kpi-content">
            <span className="feedback-kpi-value">{totalReviewsCount}</span>
            <span className="feedback-kpi-label">Total Evaluations</span>
          </div>
        </div>

        <div className="feedback-kpi-card card">
          <div className="feedback-kpi-icon green">
            <TrendingUp size={26} />
          </div>
          <div className="feedback-kpi-content">
            <span className="feedback-kpi-value">{overallClarityRate}%</span>
            <span className="feedback-kpi-label">Curriculum Clarity</span>
          </div>
        </div>

        <div className="feedback-kpi-card card">
          <div className="feedback-kpi-icon purple">
            <ThumbsUp size={26} />
          </div>
          <div className="feedback-kpi-content">
            <span className="feedback-kpi-value">{overallRecommendRate}%</span>
            <span className="feedback-kpi-label">Recommendation Rate</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="feedback-filter-bar">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-muted">Filter by Course:</span>
          <select 
            className="feedback-course-select"
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
          >
            <option value="all">All Courses ({courses.length})</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="search-container small" style={{ margin: 0, minWidth: '260px' }}>
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search employee comments..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Course-by-Course Evaluation Cards */}
      <div className="flex flex-col gap-6">
        {filteredCourses.map((course) => {
          const summary = getCourseFeedbackSummary(course.id, course.rating || 4.8);
          
          const filteredReviews = summary.reviews.filter((r) => {
            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
              r.comments?.toLowerCase().includes(q) ||
              r.userName?.toLowerCase().includes(q) ||
              r.userDepartment?.toLowerCase().includes(q)
            );
          });

          return (
            <div key={course.id} className="course-feedback-card">
              {/* Header */}
              <div className="course-feedback-top">
                <div className="course-info-block">
                  <span className="tag tag-purple" style={{ width: 'fit-content' }}>
                    {course.category}
                  </span>
                  <h2 className="course-feedback-title">{course.title}</h2>
                  <span className="text-sm text-muted">
                    {course.totalModules} modules • {course.difficulty} Level
                  </span>
                </div>

                <div className="course-rating-summary-pill">
                  <span className="avg-rating-number">{summary.averageRating}</span>
                  <div className="rating-stars-stack">
                    <div className="stars-row">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          size={16} 
                          fill={s <= Math.round(summary.averageRating) ? 'currentColor' : 'none'} 
                        />
                      ))}
                    </div>
                    <span className="total-reviews-caption">
                      Based on {summary.totalReviews} {summary.totalReviews === 1 ? 'evaluation' : 'evaluations'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Three Evaluation Questions Metrics */}
              <div className="eval-metrics-grid">
                <div className="eval-metric-item">
                  <div className="metric-header">
                    <span className="metric-name">Content Clarity & Structure</span>
                    <span className="metric-pct">{summary.clarityRate}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className="progress-bar-fill bg-green" 
                      style={{ width: `${summary.clarityRate}%` }}
                    />
                  </div>
                </div>

                <div className="eval-metric-item">
                  <div className="metric-header">
                    <span className="metric-name">Direct Job Applicability</span>
                    <span className="metric-pct">{summary.applicabilityRate}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className="progress-bar-fill bg-blue" 
                      style={{ width: `${summary.applicabilityRate}%` }}
                    />
                  </div>
                </div>

                <div className="eval-metric-item">
                  <div className="metric-header">
                    <span className="metric-name">Colleague Recommendation</span>
                    <span className="metric-pct">{summary.recommendationRate}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className="progress-bar-fill bg-gold" 
                      style={{ width: `${summary.recommendationRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Employee Reviews List */}
              <div className="flex flex-col gap-3">
                <h3 className="reviews-section-title">
                  <Users size={18} className="text-primary" />
                  <span>Employee Feedback & Comments ({filteredReviews.length})</span>
                </h3>

                {filteredReviews.length === 0 ? (
                  <div className="card p-6 text-center text-muted text-sm border-dashed">
                    {searchQuery 
                      ? 'No comments match your search filter for this course.' 
                      : 'No employee evaluations submitted yet for this course.'
                    }
                  </div>
                ) : (
                  <div className="reviews-cards-list">
                    {filteredReviews.map((review) => {
                      const initials = (review.userName || 'Learner')
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <div key={review.id} className="review-item-box">
                          <div className="review-item-header">
                            <div className="reviewer-meta">
                              <div className="reviewer-avatar-circle">{initials}</div>
                              <div className="reviewer-details">
                                <span className="reviewer-name">{review.userName}</span>
                                <span className="reviewer-role">
                                  {review.userRole} • {review.userDepartment}
                                </span>
                              </div>
                            </div>

                            <div className="review-rating-and-date">
                              <div className="stars-row">
                                {[1, 2, 3, 4, 5].map((s) => (
                                  <Star 
                                    key={s} 
                                    size={14} 
                                    fill={s <= review.rating ? 'currentColor' : 'none'} 
                                  />
                                ))}
                              </div>
                              <span className="review-date">
                                {new Date(review.submittedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          {/* Evaluation answers */}
                          <div className="review-responses-row">
                            <span className="response-pill highlight">
                              Clarity: {review.q1Clarity}
                            </span>
                            <span className="response-pill highlight">
                              Applicability: {review.q2Applicability}
                            </span>
                            <span className="response-pill highlight">
                              Recommend: {review.q3Recommendation}
                            </span>
                          </div>

                          {/* Comment body */}
                          {review.comments && (
                            <div className="review-comment-body">
                              "{review.comments}"
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminFeedback;
