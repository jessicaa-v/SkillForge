import { Link } from 'react-router-dom';
import { Search, Filter, Play, CheckCircle, Clock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import './MyLearning.css';

const MyLearning = () => {
  const { state } = useAppContext();
  const coursesData = state.courses;

  return (
    <div className="my-learning animate-slide-up">
      <div className="page-header">
        <div>
          <h1>My Learning</h1>
          <p className="page-subtitle">Discover new skills and continue your journey.</p>
        </div>
        <div className="header-actions">
          <div className="search-container small">
            <Search size={18} className="search-icon" />
            <input type="text" placeholder="Search courses..." className="search-input" />
          </div>
          <button className="btn btn-secondary">
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className="category-tabs">
        <button className="tab active">All</button>
        <button className="tab">In Progress</button>
        <button className="tab">Completed</button>
        <button className="tab">Onboarding</button>
        <button className="tab">Compliance</button>
        <button className="tab">Leadership</button>
      </div>

      <div className="courses-grid">
        {coursesData.map(course => (
          <div key={course.id} className="course-card card card-hover">
            <div className={`course-card-image category-${course.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <span className="course-tag">{course.category}</span>
              {course.status === 'completed' && (
                <div className="completed-badge">
                  <CheckCircle size={24} />
                </div>
              )}
            </div>
            
            <div className="course-card-content">
              <h3>{course.title}</h3>
              
              <div className="course-details">
                <span className="detail-item"><Clock size={14}/> {course.time}</span>
                <span className="detail-item difficulty">{course.difficulty}</span>
                <span className="detail-item xp">+{course.xpReward} XP</span>
              </div>
              
              <div className="course-progress">
                <div className="progress-info">
                  <span>{course.status === 'completed' ? 'Completed' : `${course.completedModules} of ${course.totalModules} modules`}</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="progress-bar-bg small">
                  <div className={`progress-bar-fill ${course.progress === 100 ? 'bg-green' : 'bg-blue'}`} style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              
              <div className="course-action">
                {course.status === 'not-started' ? (
                  <Link to={`/course/${course.id}`} className="btn btn-primary w-full" style={{display: 'flex'}}>Start Course</Link>
                ) : course.status === 'in-progress' ? (
                  <Link to={`/course/${course.id}`} className="btn btn-secondary w-full" style={{display: 'flex'}}>Continue Learning</Link>
                ) : (
                  <Link to={`/course/${course.id}`} className="btn btn-secondary w-full" style={{display: 'flex'}}>Review Course</Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;
