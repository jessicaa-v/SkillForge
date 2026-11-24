import { useState } from 'react';
import { 
  X, 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  Edit3, 
  Send 
} from 'lucide-react';
import { 
  evaluationQuestions, 
  getUserFeedbackForCourse, 
  saveCourseFeedback 
} from '../../utils/feedbackStorage';
import './CourseFeedbackModal.css';

const ratingLabels = {
  1: '1 Star - Needs Substantial Improvement',
  2: '2 Stars - Fair, Room for Growth',
  3: '3 Stars - Good & Informative',
  4: '4 Stars - Very Good & Well Structured',
  5: '5 Stars - Outstanding & Impactful'
};

const CourseFeedbackModal = ({ course, user, onClose, onSubmitted }) => {
  const existingFeedback = getUserFeedbackForCourse(course?.id, user?.id);

  const [isEditMode, setIsEditMode] = useState(!existingFeedback);
  const [rating, setRating] = useState(existingFeedback?.rating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [q1, setQ1] = useState(existingFeedback?.q1Clarity || evaluationQuestions[0].options[2]);
  const [q2, setQ2] = useState(existingFeedback?.q2Applicability || evaluationQuestions[1].options[2]);
  const [q3, setQ3] = useState(existingFeedback?.q3Recommendation || evaluationQuestions[2].options[3]);
  const [comments, setComments] = useState(existingFeedback?.comments || '');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!course) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved = saveCourseFeedback({
      courseId: course.id,
      courseTitle: course.title,
      userId: user?.id || 'emp-001',
      userName: user?.name || 'Alex Thorne',
      userRole: user?.jobTitle || 'Product Designer',
      userDepartment: user?.department || 'Product',
      rating,
      q1Clarity: q1,
      q2Applicability: q2,
      q3Recommendation: q3,
      comments
    });

    setSubmittedSuccess(true);
    if (onSubmitted) onSubmitted(saved);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsEditMode(false);
    }, 1200);
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="feedback-modal-overlay animate-slide-up" onClick={onClose}>
      <div className="feedback-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="feedback-modal-header">
          <div className="feedback-header-title">
            <MessageSquare size={20} className="text-primary" />
            <span>Course Evaluation & Feedback</span>
          </div>
          <button className="cert-modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="feedback-modal-body">
          {/* Course Banner */}
          <div className="feedback-course-banner">
            <span className="feedback-course-tag">{course.category || 'Course Feedback'}</span>
            <h3 className="feedback-course-name">{course.title}</h3>
          </div>

          {/* Submission status badge */}
          {existingFeedback && !isEditMode && (
            <div className="already-submitted-badge">
              <CheckCircle2 size={16} />
              <span>You submitted feedback for this course on {new Date(existingFeedback.submittedAt).toLocaleDateString()}</span>
            </div>
          )}

          {submittedSuccess && (
            <div className="card p-4 bg-green-light border-green flex items-center gap-2 text-green-400">
              <CheckCircle2 size={20} />
              <span className="font-bold">Thank you! Your feedback has been saved and shared with HR.</span>
            </div>
          )}

          {/* 1. Star Rating */}
          <div className="rating-section">
            <span className="rating-section-title">
              {isEditMode ? 'Rate your overall course experience (1–5 Stars):' : 'Your Rating:'}
            </span>
            <div className="stars-interactive-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-interactive-btn ${star <= currentDisplayRating ? 'filled' : ''}`}
                  onClick={() => isEditMode && setRating(star)}
                  onMouseEnter={() => isEditMode && setHoverRating(star)}
                  onMouseLeave={() => isEditMode && setHoverRating(0)}
                  disabled={!isEditMode}
                  title={`${star} Star`}
                >
                  <Star size={32} fill={star <= currentDisplayRating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <span className="rating-descriptor">
              {ratingLabels[currentDisplayRating] || `${currentDisplayRating} Stars`}
            </span>
          </div>

          {/* 2. Three Evaluation Questions */}
          <div className="evaluation-questions-wrapper">
            {/* Question 1: Content Clarity */}
            <div className="eval-question-block">
              <span className="eval-question-text">
                1. {evaluationQuestions[0].question}
              </span>
              <div className="eval-options-grid">
                {evaluationQuestions[0].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`eval-option-pill ${q1 === opt ? 'active' : ''}`}
                    onClick={() => isEditMode && setQ1(opt)}
                    disabled={!isEditMode}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Job Applicability */}
            <div className="eval-question-block">
              <span className="eval-question-text">
                2. {evaluationQuestions[1].question}
              </span>
              <div className="eval-options-grid">
                {evaluationQuestions[1].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`eval-option-pill ${q2 === opt ? 'active' : ''}`}
                    onClick={() => isEditMode && setQ2(opt)}
                    disabled={!isEditMode}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Recommendation */}
            <div className="eval-question-block">
              <span className="eval-question-text">
                3. {evaluationQuestions[2].question}
              </span>
              <div className="eval-options-grid">
                {evaluationQuestions[2].options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`eval-option-pill ${q3 === opt ? 'active' : ''}`}
                    onClick={() => isEditMode && setQ3(opt)}
                    disabled={!isEditMode}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Feedback Comments Textarea */}
          <div className="feedback-textarea-block">
            <label className="feedback-textarea-label" htmlFor="feedback-comment">
              Detailed Comments & Suggestions for HR:
            </label>
            <textarea
              id="feedback-comment"
              className="feedback-textarea"
              placeholder={isEditMode ? "Share specific insights about what was most valuable, what could be improved, or how this training helped you..." : "No additional comments provided."}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              disabled={!isEditMode}
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="feedback-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>

          {existingFeedback && !isEditMode ? (
            <button className="btn btn-primary" onClick={() => setIsEditMode(true)}>
              <Edit3 size={16} /> Edit My Feedback
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Send size={16} /> Submit Feedback
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseFeedbackModal;
