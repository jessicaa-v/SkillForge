import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Play, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Star, 
  Compass, 
  ArrowRight,
  Award
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CategoryIllustration } from '../components/GameIcons';
import { ForgeMascot } from '../components/ForgeMascot';
import CertificateModal from '../components/certificate/CertificateModal';
import { getCertificateByCourseId, generateCertificateForCourse } from '../utils/certificateStorage';
import './MyLearning.css';

const categoriesList = [
  'All',
  'In Progress',
  'Completed',
  'Communication',
  'Onboarding',
  'Compliance',
  'Leadership',
  'Performance'
];

const MyLearning = () => {
  const { state } = useAppContext();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCertificate, setActiveCertificate] = useState(null);

  const coursesData = state.courses || [];

  // Filter courses based on tab & search
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (activeTab === 'All') return true;
    if (activeTab === 'In Progress') return course.status === 'in-progress';
    if (activeTab === 'Completed') return course.status === 'completed';
    return course.category.toLowerCase() === activeTab.toLowerCase();
  });

  const featuredCourse = coursesData.find(c => c.status === 'in-progress') || coursesData[0];

  const handleViewCert = (course) => {
    const cert = getCertificateByCourseId(course.id) || generateCertificateForCourse(course, state.user);
    setActiveCertificate(cert);
  };

  return (
    <div className="my-learning-container animate-slide-up">
      {/* Page Header */}
      <div className="learning-page-header">
        <div>
          <div className="header-pill">
            <Compass size={14} className="text-purple" /> COURSE DISCOVERY & FORGE QUESTS
          </div>
          <h1 className="learning-title">My Learning Realm</h1>
          <p className="learning-subtitle">Master new abilities, conquer certifications, and expand your skill tree.</p>
        </div>

        <div className="header-controls">
          <div className="search-bar-wrap">
            <Search size={18} className="search-ico" />
            <input 
              type="text" 
              placeholder="Search quests, skills..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-course-input" 
            />
          </div>
        </div>
      </div>

      {/* FEATURED / RECOMMENDED COURSE HERO QUEST */}
      {featuredCourse && (
        <div className="featured-course-card card">
          <div className="featured-badge-pill">
            <Sparkles size={14} /> RECOMMENDED QUEST FOR YOU
          </div>

          <div className="featured-card-body">
            <div className="featured-content-left">
              <span className="tag tag-purple mb-2">{featuredCourse.category}</span>
              <h2 className="featured-title">{featuredCourse.title}</h2>
              <p className="featured-desc">
                Continue your learning streak to unlock the "Active Communicator" badge and earn +{featuredCourse.xpReward} XP for your team ranking!
              </p>

              <div className="featured-meta-row">
                <span className="f-meta-item"><Clock size={16} /> {featuredCourse.time}</span>
                <span className="f-meta-item xp-text"><Sparkles size={16} /> +{featuredCourse.xpReward} XP</span>
                <span className="f-meta-item"><Star size={16} fill="#FFC857" color="#FFC857" /> {featuredCourse.rating || 4.8}</span>
                <span className="f-meta-item pill-diff">{featuredCourse.difficulty}</span>
              </div>

              <div className="featured-actions">
                <Link to={`/course/${featuredCourse.id}`} className="btn btn-primary btn-large">
                  <Play size={18} fill="currentColor" /> Continue This Quest
                </Link>
                <div className="featured-progress-snippet">
                  <div className="snippet-text">
                    <span>Progress: {featuredCourse.progress}%</span>
                    <span>{featuredCourse.completedModules} of {featuredCourse.totalModules} modules</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className="progress-bar-fill bg-green" 
                      style={{ width: `${featuredCourse.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-art-right">
              <CategoryIllustration category={featuredCourse.category} size={110} />
              <div className="featured-mascot-helper">
                <ForgeMascot pose="learning" size={105} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY FILTER TABS */}
      <div className="category-tabs-container">
        <div className="category-tabs-row">
          {categoriesList.map(cat => (
            <button 
              key={cat} 
              className={`cat-pill-tab ${activeTab === cat ? 'is-active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COURSES DISCOVERY GRID */}
      <div className="courses-showcase-grid">
        {filteredCourses.map(course => {
          const isDone = course.status === 'completed';
          const isInProgress = course.status === 'in-progress';
          
          return (
            <div key={course.id} className="course-showcase-card card card-hover">
              {/* Card Illustration Banner */}
              <div className={`card-banner-illustration category-banner-${course.category.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="banner-top-badges">
                  <span className="course-category-pill">{course.category}</span>
                  <span className="course-diff-pill">{course.difficulty}</span>
                </div>

                <div className="banner-center-art">
                  <CategoryIllustration category={course.category} size={68} />
                </div>

                {isDone && (
                  <div className="course-done-seal" title="Course Completed!">
                    <CheckCircle2 size={18} />
                    <span>DONE</span>
                  </div>
                )}
              </div>
              
              {/* Card Body Content */}
              <div className="course-card-details">
                <h3 className="course-card-title">{course.title}</h3>
                
                {/* Meta details */}
                <div className="course-specs-row">
                  <span className="spec-item"><Clock size={14}/> {course.time}</span>
                  <span className="spec-item xp-badge-text"><Sparkles size={14} /> +{course.xpReward} XP</span>
                  <span className="spec-item rating-text">★ {course.rating || 4.8}</span>
                </div>
                
                {/* Progress bar */}
                <div className="course-card-progress">
                  <div className="progress-labels-row">
                    <span>{isDone ? 'Completed 100%' : `${course.completedModules} / ${course.totalModules} Lessons`}</span>
                    <span className="font-bold">{course.progress}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div 
                      className={`progress-bar-fill ${isDone ? 'bg-green' : 'bg-purple'}`} 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Action button */}
                <div className="course-card-action">
                  {isDone ? (
                    <div className="flex gap-2 w-full">
                      <Link to={`/course/${course.id}`} className="btn btn-secondary flex-1" style={{ display: 'flex', justifyContent: 'center' }}>
                        Review
                      </Link>
                      <button 
                        className="btn btn-gold flex-1" 
                        onClick={() => handleViewCert(course)} 
                        style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', fontSize: '0.85rem' }}
                      >
                        <Award size={15} /> Certificate
                      </button>
                    </div>
                  ) : isInProgress ? (
                    <Link to={`/course/${course.id}`} className="btn btn-primary w-full">
                      <Play size={16} fill="currentColor" /> Continue Learning
                    </Link>
                  ) : (
                    <Link to={`/course/${course.id}`} className="btn btn-mint w-full">
                      Start New Quest <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
};

export default MyLearning;
