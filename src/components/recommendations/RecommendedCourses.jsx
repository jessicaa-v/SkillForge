import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Star, 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Compass,
  ArrowRight 
} from 'lucide-react';
import { getPersonalizedRecommendations } from '../../utils/recommendations';
import './RecommendedCourses.css';

const RecommendedCourses = ({ courses, user }) => {
  const recommendations = getPersonalizedRecommendations({
    courses,
    user,
    limit: 3
  });

  if (!recommendations.length) return null;

  const getReasonIcon = (type) => {
    switch (type) {
      case 'skill':
        return <TrendingUp size={14} className="recommendation-reason-icon" />;
      case 'quiz':
        return <Target size={14} className="recommendation-reason-icon" />;
      case 'completed_course':
        return <CheckCircle2 size={14} className="recommendation-reason-icon" />;
      default:
        return <Sparkles size={14} className="recommendation-reason-icon" />;
    }
  };

  const getDifficultyClass = (diff) => {
    const lower = (diff || 'Beginner').toLowerCase();
    if (lower === 'intermediate') return 'intermediate';
    if (lower === 'advanced') return 'advanced';
    return 'beginner';
  };

  return (
    <section className="dashboard-section card recommendations-section animate-slide-up mt-6">
      <div className="section-header recommendations-header">
        <div className="recommendations-header-left">
          <Compass size={20} className="text-cyan" />
          <h2>Recommended For You</h2>
        </div>
        <div className="recommendations-ai-badge">
          <Sparkles size={12} /> Personalized
        </div>
      </div>

      <div className="recommendations-grid">
        {recommendations.map((rec) => (
          <Link
            key={rec.id}
            to={`/course/${rec.id}`}
            className="recommendation-card card-hover"
            title={`Click to view details for ${rec.title}`}
          >
            <div className="recommendation-top-content">
              {/* Reason for recommendation */}
              <div className={`recommendation-reason-box ${rec.reasonType}`}>
                {getReasonIcon(rec.reasonType)}
                <span>{rec.reason}</span>
              </div>

              {/* Title & Category */}
              <div className="recommendation-card-body mt-3">
                <span className="recommendation-category">{rec.category}</span>
                <h3 className="recommendation-title">{rec.title}</h3>
              </div>
            </div>

            <div className="recommendation-bottom-content">
              {/* Metadata: Difficulty, Duration, XP */}
              <div className="recommendation-meta-row">
                <div className="meta-group">
                  <span className={`rec-meta-item difficulty-badge ${getDifficultyClass(rec.difficulty)}`}>
                    {rec.difficulty}
                  </span>
                  <span className="rec-meta-item">
                    <Clock size={13} /> {rec.time}
                  </span>
                </div>
                <span className="rec-meta-item xp">
                  <Star size={13} /> +{rec.xpReward} XP
                </span>
              </div>

              {/* Action Prompt */}
              <div className="recommendation-click-action">
                <span>{rec.status === 'in-progress' ? 'Continue Learning' : 'View Course Details'}</span>
                <ArrowRight size={15} className="rec-action-arrow" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedCourses;
