import { useState } from 'react';
import { Play, CheckCircle2, Lock, Star, ChevronLeft, Award, MessageSquare } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CertificateModal from '../components/certificate/CertificateModal';
import CourseFeedbackModal from '../components/feedback/CourseFeedbackModal';
import { generateCertificateForCourse, getCertificateByCourseId } from '../utils/certificateStorage';
import { getUserFeedbackForCourse } from '../utils/feedbackStorage';
import './CourseView.css';

const CourseView = () => {
  const { courseId } = useParams();
  const { state, addXP, dispatch } = useAppContext();
  const [xpEarned, setXpEarned] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [, setFeedbackTrigger] = useState(0);

  const course = state.courses.find(c => c.id === courseId) || state.courses[0];
  const userFeedback = getUserFeedbackForCourse(course.id, state.user?.id);

  const handleOpenCertificate = () => {
    const cert = getCertificateByCourseId(course.id) || generateCertificateForCourse(course, state.user);
    setActiveCertificate(cert);
  };

  const completeLesson = () => {
    setLessonCompleted(true);
    setTimeout(() => {
      setXpEarned(true);
      addXP(100, 'Lesson Completed');
      dispatch({ type: 'COMPLETE_MODULE', payload: { courseId: course.id, moduleId: 5 } });
      
      // If this completes the course, generate certificate
      if (course.completedModules + 1 >= course.totalModules) {
        generateCertificateForCourse({ ...course, status: 'completed', progress: 100 }, state.user);
      }
    }, 500);
  };

  return (
    <div className="course-view animate-slide-up">
      <div className="course-header">
        <Link to="/learning" className="back-link">
          <ChevronLeft size={20} /> Back to Learning
        </Link>
        <div className="course-header-content">
          <div>
            <span className="tag tag-purple mb-2">{course.category}</span>
            <h1>{course.title}</h1>
            <p className="course-subtitle">Master the art of clear and effective workplace communication.</p>
          </div>
          <div className="course-stats-card card">
            <div className="stat-row">
              <span className="stat-label">Progress</span>
              <span className="stat-value font-bold">{course.progress}%</span>
            </div>
            <div className="progress-bar-bg small mt-2 mb-4">
              <div className="progress-bar-fill bg-green" style={{ width: `${course.progress}%` }}></div>
            </div>
            <div className="stat-row">
              <span className="stat-label">Estimated Time</span>
              <span className="stat-value">2h 15m</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">XP Available</span>
              <span className="stat-value text-gold">500 XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="course-content-grid">
        <div className="col-roadmap">
          <div className="card h-full">
            <h2 className="mb-4 text-lg font-bold">Course Roadmap</h2>
            <div className="roadmap">
              <div className="roadmap-item completed">
                <div className="roadmap-icon"><CheckCircle2 size={16} /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title">Module 1: Communication Basics</span>
                  <span className="roadmap-meta">Completed • +100 XP</span>
                </div>
              </div>
              <div className="roadmap-connector completed"></div>
              
              <div className="roadmap-item completed">
                <div className="roadmap-icon"><CheckCircle2 size={16} /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title">Module 2: Non-verbal Cues</span>
                  <span className="roadmap-meta">Completed • +100 XP</span>
                </div>
              </div>
              <div className="roadmap-connector completed"></div>

              <div className="roadmap-item completed">
                <div className="roadmap-icon"><CheckCircle2 size={16} /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title">Module 3: Written Communication</span>
                  <span className="roadmap-meta">Completed • +100 XP</span>
                </div>
              </div>
              <div className="roadmap-connector completed"></div>
              
              <div className="roadmap-item active">
                <div className="roadmap-icon pulse"><Play size={14} className="ml-1" /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title text-primary">Module 4: Active Listening</span>
                  <span className="roadmap-meta">Current Module • +100 XP</span>
                </div>
              </div>
              <div className="roadmap-connector"></div>
              
              <div className="roadmap-item locked">
                <div className="roadmap-icon"><Lock size={14} /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title">Module 5: Conflict Resolution</span>
                  <span className="roadmap-meta">Locked • +100 XP</span>
                </div>
              </div>
              <div className="roadmap-connector"></div>
              
              <div className="roadmap-item locked">
                <div className="roadmap-icon"><Star size={14} /></div>
                <div className="roadmap-info">
                  <span className="roadmap-title text-gold">Final Challenge: Quiz</span>
                  <span className="roadmap-meta">Locked • +200 XP Bonus</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lesson">
          <div className="card lesson-card">
            <div className="lesson-header">
              <h2>Module 4: Active Listening Techniques</h2>
              <span className="tag tag-gold">+100 XP</span>
            </div>
            
            <div className="video-placeholder">
              <div className="play-button">
                <Play size={32} />
              </div>
              <span>Video content would load here</span>
            </div>

            <div className="lesson-content">
              <h3>What is Active Listening?</h3>
              <p>Active listening involves more than just hearing someone speak. When you listen actively, you are fully engaged and immersed in what the other person is saying.</p>
              
              <div className="info-box">
                <h4 className="flex items-center gap-2"><Star size={16} className="text-gold" /> Key Takeaways</h4>
                <ul>
                  <li>Pay attention to body language</li>
                  <li>Avoid interrupting the speaker</li>
                  <li>Provide feedback and ask clarifying questions</li>
                  <li>Defer judgment</li>
                </ul>
              </div>
            </div>

            <div className="lesson-actions">
              {lessonCompleted ? (
                <button className="btn btn-primary w-full success-state" disabled>
                  <CheckCircle2 size={20} /> Lesson Completed
                </button>
              ) : (
                <button className="btn btn-primary w-full" onClick={completeLesson}>
                  Complete Lesson
                </button>
              )}
            </div>
            
            {xpEarned && (
              <div className="xp-reward-toast animate-slide-up">
                <div className="xp-reward-content">
                  <Star size={32} className="text-gold reward-icon" />
                  <div className="xp-reward-text">
                    <span className="xp-earned-title">Lesson Complete!</span>
                    <span className="xp-earned-amount text-gold">+100 XP</span>
                  </div>
                </div>
              </div>
            )}

            {(course.status === 'completed' || course.progress === 100) && (
              <>
                <div className="card mt-6 p-4 flex justify-between items-center" style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <div className="flex items-center gap-3">
                    <Award size={28} className="text-gold" />
                    <div>
                      <h4 className="font-bold text-sm text-primary" style={{ color: 'var(--color-accent-gold)' }}>Official Certificate Available</h4>
                      <p className="text-xs text-muted">You have completed all curriculum modules for this course.</p>
                    </div>
                  </div>
                  <button className="btn btn-gold text-sm" onClick={handleOpenCertificate}>
                    <Award size={15} /> View Certificate
                  </button>
                </div>

                <div className="card mt-4 p-4 flex justify-between items-center" style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  <div className="flex items-center gap-3">
                    <MessageSquare size={28} className="text-primary" />
                    <div>
                      <h4 className="font-bold text-sm text-primary">
                        {userFeedback ? `Course Evaluated (★ ${userFeedback.rating}/5)` : 'Rate & Evaluate This Course'}
                      </h4>
                      <p className="text-xs text-muted">
                        {userFeedback 
                          ? 'Your feedback has been saved and shared with HR. Click to review or update.' 
                          : 'Share a 1–5 star rating and quick feedback to help HR improve employee training.'}
                      </p>
                    </div>
                  </div>
                  <button className="btn btn-secondary text-sm" onClick={() => setShowFeedbackModal(true)}>
                    <MessageSquare size={15} /> {userFeedback ? 'View My Feedback' : 'Leave Feedback'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {showFeedbackModal && (
        <CourseFeedbackModal
          course={course}
          user={state.user}
          onClose={() => setShowFeedbackModal(false)}
          onSubmitted={() => setFeedbackTrigger((prev) => prev + 1)}
        />
      )}
    </div>
  );
};

export default CourseView;
