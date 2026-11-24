import { useState } from 'react';
import { Play, CheckCircle2, Lock, ChevronLeft, Sparkles, BookOpen, Clock, Crown, Flame } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import { CategoryIllustration } from '../components/GameIcons';
import './CourseView.css';

const modulesList = [
  { id: 1, title: 'Module 1: Communication Basics', desc: 'Core fundamentals of high-impact clarity', status: 'completed', xp: 100, icon: 'check' },
  { id: 2, title: 'Module 2: Non-verbal Signals', desc: 'Mastering posture, gestures, and tone', status: 'completed', xp: 100, icon: 'check' },
  { id: 3, title: 'Module 3: Written Precision', desc: 'Email and Slack etiquette that saves hours', status: 'completed', xp: 100, icon: 'check' },
  { id: 4, title: 'Module 4: Active Listening', desc: 'Reflective responses & empathetic feedback loops', status: 'active', xp: 100, icon: 'current' },
  { id: 5, title: 'Module 5: Conflict Resolution', desc: 'De-escalating friction into team alignment', status: 'locked', xp: 100, icon: 'locked' },
  { id: 6, title: 'Final Challenge: Boss Assessment', desc: 'Comprehensive scenario simulator & quiz', status: 'boss', xp: 200, icon: 'boss' },
];

const CourseView = () => {
  const { courseId } = useParams();
  const { state, addXP, dispatch } = useAppContext();
  const [selectedModule, setSelectedModule] = useState(4);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const course = state.courses.find(c => c.id === courseId) || state.courses[0];

  const completeLesson = () => {
    setLessonCompleted(true);
    setShowCelebration(true);
    setTimeout(() => {
      addXP(100, 'Lesson Completed');
      dispatch({ type: 'COMPLETE_MODULE', payload: { courseId: course.id, moduleId: selectedModule } });
    }, 400);
  };

  return (
    <div className="course-view-container animate-slide-up">
      {/* Navigation & Header */}
      <div className="course-top-nav">
        <Link to="/learning" className="back-button-pill">
          <ChevronLeft size={18} /> Back to Courses
        </Link>
        <div className="course-crumbs">
          <span className="crumb-dim">My Learning</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-active">{course.title}</span>
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="course-hero-header card">
        <div className="course-hero-left">
          <div className="hero-category-tag">
            <CategoryIllustration category={course.category} size={28} />
            <span className="cat-name">{course.category}</span>
          </div>
          <h1 className="course-hero-title">{course.title}</h1>
          <p className="course-hero-subtitle">
            Navigate the interactive RPG pathway, conquer lesson nodes, and earn rare certifications and XP.
          </p>

          <div className="course-meta-pills">
            <div className="meta-pill">
              <Clock size={15} className="text-blue" />
              <span>{course.time || '2h 15m'}</span>
            </div>
            <div className="meta-pill">
              <Sparkles size={15} className="text-gold" />
              <span>+{course.xpReward || 500} Total XP</span>
            </div>
            <div className="meta-pill">
              <BookOpen size={15} className="text-purple" />
              <span>{course.completedModules} / {course.totalModules} Completed</span>
            </div>
            <div className="meta-pill">
              <Flame size={15} className="text-coral" />
              <span>{course.difficulty || 'Beginner'} Tier</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker Card */}
        <div className="course-progress-card">
          <div className="progress-top-row">
            <span className="progress-label">Quest Completion</span>
            <span className="progress-percent-val">{course.progress}%</span>
          </div>
          <div className="progress-bar-bg large mt-2 mb-3">
            <div 
              className="progress-bar-fill bg-green" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <div className="progress-stats-footer">
            <span>Remaining: {course.totalModules - course.completedModules} lessons</span>
            <span className="highlight-gold font-bold">⭐ Mastery Lv. 2</span>
          </div>
        </div>
      </div>

      {/* Main Grid: RPG Learning Journey Map on the left, Active Lesson Arena on the right */}
      <div className="journey-arena-grid">
        {/* LEFT COLUMN: THE RPG LEARNING PATHWAY MAP */}
        <div className="rpg-map-column card">
          <div className="rpg-map-header">
            <div>
              <h2 className="rpg-map-heading">
                <Crown size={20} className="text-gold" />
                RPG QUEST MAP
              </h2>
              <p className="rpg-map-sub">Follow the winding trail to the Boss node</p>
            </div>
            <div className="map-legend">
              <span className="legend-dot completed"></span> Done
              <span className="legend-dot active"></span> Current
              <span className="legend-dot boss"></span> Boss
            </div>
          </div>

          {/* THE WINDING RPG MAP */}
          <div className="rpg-path-canvas">
            {/* Mascot cheering beside the current active node */}
            <div className="rpg-mascot-companion">
              <div className="mascot-speech-mini">
                <span>"You got this!"</span>
              </div>
              <ForgeMascot pose="learning" size={90} />
            </div>

            <div className="rpg-nodes-wrapper">
              {modulesList.map((mod, idx) => {
                const isSelected = selectedModule === mod.id;
                const isCompleted = mod.status === 'completed';
                const isActive = mod.status === 'active';
                const isBoss = mod.status === 'boss';
                const isLocked = mod.status === 'locked';

                // Alternating node alignments for the winding S-curve feel
                const alignmentClass = idx % 2 === 0 ? 'align-left' : 'align-right';

                return (
                  <div key={mod.id} className={`rpg-node-row ${alignmentClass}`}>
                    <div 
                      className={`rpg-node-bubble ${mod.status} ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => !isLocked && setSelectedModule(mod.id)}
                    >
                      {/* Node Icon */}
                      <div className="node-icon-circle">
                        {isCompleted && <CheckCircle2 size={24} className="node-check" />}
                        {isActive && <Play size={20} className="node-play" fill="currentColor" />}
                        {isLocked && <Lock size={18} className="node-lock" />}
                        {isBoss && <Crown size={22} className="node-crown" />}
                      </div>

                      {/* Ripple pulse for active node */}
                      {isActive && <span className="active-radar-pulse"></span>}

                      {/* Node Label Card */}
                      <div className="node-label-card">
                        <div className="node-label-top">
                          <span className="node-step-tag">Step {mod.id}</span>
                          <span className="node-xp-tag">+{mod.xp} XP</span>
                        </div>
                        <h4 className="node-title-text">{mod.title.replace(/Module \d+: /, '')}</h4>
                        <span className="node-desc-text">{mod.desc}</span>
                      </div>
                    </div>

                    {/* Path connecting dash/line to next node */}
                    {idx < modulesList.length - 1 && (
                      <div className={`rpg-trail-connector ${isCompleted ? 'trail-done' : ''}`}>
                        <div className="trail-dot"></div>
                        <div className="trail-dot"></div>
                        <div className="trail-dot"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE LESSON ARENA */}
        <div className="lesson-arena-column">
          <div className="card lesson-arena-card">
            <div className="lesson-arena-header">
              <div className="lesson-header-badge">
                <span className="tag tag-purple">CURRENT OBJECTIVE</span>
                <span className="tag tag-gold">+100 XP REWARD</span>
              </div>
              <h2 className="lesson-arena-title">Module 4: Active Listening Techniques</h2>
              <p className="lesson-arena-meta">Estimated time: 15 minutes • Interactive Scenario</p>
            </div>

            {/* Video / Interactive Stage Placeholder */}
            <div className="interactive-stage">
              <div className="stage-overlay-glow"></div>
              <div className="stage-center-box">
                <div className="stage-play-btn">
                  <Play size={32} fill="#FFFFFF" />
                </div>
                <h3 className="stage-title">Interactive Masterclass Simulator</h3>
                <p className="stage-sub">Video lecture with real-time dialogue choice prompts</p>
              </div>
              <div className="stage-sparkle-decor">⚡</div>
            </div>

            {/* Lesson Knowledge Scroll */}
            <div className="lesson-knowledge-box">
              <h3 className="knowledge-heading">
                <BookOpen size={18} className="text-purple" />
                Key Workplace Principles
              </h3>
              <p className="knowledge-text">
                Active listening is the cornerstone of trust. It requires listening with full presence, mirroring key emotional cues, and confirming intent before offering solutions.
              </p>

              <div className="takeaways-list">
                <div className="takeaway-item">
                  <div className="takeaway-bullet">1</div>
                  <div>
                    <strong>Reflective Paraphrasing:</strong> Restate what you heard in your own words to confirm shared understanding.
                  </div>
                </div>
                <div className="takeaway-item">
                  <div className="takeaway-bullet">2</div>
                  <div>
                    <strong>Deferring Judgment:</strong> Allow your colleague to finish their thought completely without preemptive debate.
                  </div>
                </div>
                <div className="takeaway-item">
                  <div className="takeaway-bullet">3</div>
                  <div>
                    <strong>Curious Inquiry:</strong> Ask open-ended questions like "What outcome would feel ideal here?"
                  </div>
                </div>
              </div>
            </div>

            {/* Completion Action */}
            <div className="lesson-actions-container">
              {lessonCompleted ? (
                <div className="lesson-completed-banner">
                  <div className="completed-check-icon">
                    <CheckCircle2 size={26} />
                  </div>
                  <div>
                    <h4 className="completed-title">Lesson Completed! 🎉</h4>
                    <p className="completed-sub">+100 XP added to your total score.</p>
                  </div>
                </div>
              ) : (
                <button 
                  className="btn btn-mint btn-large w-full lesson-complete-btn" 
                  onClick={completeLesson}
                >
                  <Sparkles size={20} /> Complete Lesson & Collect +100 XP
                </button>
              )}
            </div>

            {/* Celebration Modal / Banner */}
            {showCelebration && (
              <div className="celebration-toast animate-pop">
                <ForgeMascot pose="celebrate" size={54} />
                <div className="celebration-content">
                  <h4>Level Progress Unlocked!</h4>
                  <p>Sparky says: You're one step closer to the Boss Quiz! ⚡</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
