import { 
  Flame, 
  Trophy, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  ArrowUpRight
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ForgeMascot } from '../components/ForgeMascot';
import { CollectibleBadge } from '../components/GameIcons';
import './Profile.css';

const certificates = [
  { id: 'cert-1', title: 'Workplace Communication Specialist', issuer: 'SkillForge Academy', date: 'Feb 2026', grade: 'Honors 96%' },
  { id: 'cert-2', title: 'Cybersecurity Protocol Vanguard', issuer: 'Global Compliance Board', date: 'Jan 2026', grade: 'Pass 100%' },
  { id: 'cert-3', title: 'Strategic Product Foundations', issuer: 'Design Systems Guild', date: 'Dec 2025', grade: 'Distinction' },
];

const Profile = () => {
  const { state } = useAppContext();
  
  if (!state.user || state.user.role === 'hr') return null;
  const currentUser = state.user;
  const achievementsData = state.achievements || [];
  const xpProgress = Math.min(100, Math.round((currentUser.xp / currentUser.nextLevelXp) * 100));

  return (
    <div className="profile-realm animate-slide-up">
      {/* 1. HERO PROFILE CARD */}
      <div className="profile-banner-card card">
        {/* Playful Gamified Cover Banner */}
        <div className="profile-cover-gradient">
          <div className="cover-shapes">
            <span className="shape shape-1"></span>
            <span className="shape shape-2"></span>
          </div>
          <div className="cover-badge-chip">
            <Sparkles size={14} /> LEVEL {currentUser.level} ADVENTURER
          </div>
        </div>

        {/* Profile Info Container */}
        <div className="profile-header-body">
          <div className="avatar-positioner">
            <img 
              src={`https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.name?.split(' ')[1] || 'T'}&background=7656E8&color=fff&size=200&bold=true`} 
              alt={currentUser.name} 
              className="profile-avatar-img" 
            />
            <div className="avatar-level-ring" title={`Level ${currentUser.level}`}>
              <span>{currentUser.level}</span>
            </div>
          </div>
          
          <div className="profile-core-details">
            <div className="name-and-title-row">
              <h1 className="profile-user-title">{currentUser.name}</h1>
              <span className="title-tag-gold">{currentUser.title || 'Senior Explorer'}</span>
            </div>
            <p className="profile-sub-role">
              {currentUser.jobTitle || 'Product Designer'} • <span className="dept-highlight">{currentUser.department || 'Product'} Team</span>
            </p>
            
            {/* Stat Badges Row */}
            <div className="profile-pills-row">
              <div className="pill-stat xp-pill">
                <Sparkles size={16} />
                <span><strong>{currentUser.xp?.toLocaleString()}</strong> XP</span>
              </div>
              <div className="pill-stat streak-pill">
                <Flame size={16} />
                <span><strong>{currentUser.streak}</strong> Day Streak</span>
              </div>
              <div className="pill-stat rank-pill">
                <Trophy size={16} />
                <span>Rank <strong>#{currentUser.rank}</strong></span>
              </div>
              <div className="pill-stat coins-pill">
                <Award size={16} />
                <span><strong>{currentUser.coins?.toLocaleString() || '1,450'}</strong> Coins</span>
              </div>
            </div>

            {/* Next Level Progression Bar */}
            <div className="profile-xp-meter mt-3">
              <div className="meter-label-row">
                <span>Next Milestone: <strong>Level {currentUser.level + 1}</strong></span>
                <span>{currentUser.xp?.toLocaleString()} / {currentUser.nextLevelXp?.toLocaleString()} XP ({xpProgress}%)</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill bg-purple" style={{ width: `${xpProgress}%` }}></div>
              </div>
            </div>
          </div>
          
          <div className="profile-header-actions">
            <button className="btn btn-primary">Edit Profile</button>
            <div className="profile-companion-mascot">
              <ForgeMascot pose="welcome" size={90} />
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN GRID: CONNECTED SKILL TREE ON LEFT, ACHIEVEMENTS & CERTS ON RIGHT */}
      <div className="profile-layout-grid">
        {/* LEFT COLUMN: THE CONNECTED SKILL PROGRESSION TREE */}
        <div className="profile-col-skills">
          <div className="card skill-tree-card">
            <div className="section-header">
              <h2>
                <Zap size={22} className="text-gold" />
                RPG SKILL TREE & BRANCHES
              </h2>
              <span className="tag tag-purple">Tier 3 Mastery</span>
            </div>
            <p className="skill-tree-desc">
              Connected progression tree showing your domain competencies and unlockable branch masteries.
            </p>

            {/* Interactive Connected Nodes Tree */}
            <div className="skill-tree-container">
              {/* Central Core Trunk Node */}
              <div className="tree-core-node">
                <div className="core-node-icon">
                  <Award size={26} />
                </div>
                <div className="core-node-info">
                  <span className="core-node-label">NEXUS CORE</span>
                  <span className="core-node-val">Total Mastery 78%</span>
                </div>
              </div>

              {/* Connecting Tree Lines */}
              <div className="tree-branches-connector">
                <div className="branch-line line-1"></div>
                <div className="branch-line line-2"></div>
                <div className="branch-line line-3"></div>
              </div>

              {/* Connected Branch Nodes */}
              <div className="skill-nodes-grid">
                {Object.entries(currentUser.skills || {}).map(([skill, val]) => {
                  const masteryTier = val >= 85 ? 'Master' : val >= 70 ? 'Adept' : 'Journeyman';
                  const tierColors = {
                    Master: 'tier-master',
                    Adept: 'tier-adept',
                    Journeyman: 'tier-journey'
                  };

                  return (
                    <div key={skill} className={`skill-branch-node card-hover ${tierColors[masteryTier]}`}>
                      <div className="branch-header-row">
                        <div className="node-gem-icon">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="node-skill-name">{skill.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="node-mastery-tag">{masteryTier}</span>
                      </div>

                      <div className="branch-meter-block">
                        <div className="meter-info">
                          <span>Proficiency</span>
                          <strong>{val}%</strong>
                        </div>
                        <div className="progress-bar-bg small">
                          <div 
                            className={`progress-bar-fill ${val >= 80 ? 'bg-mint' : val >= 70 ? 'bg-purple' : 'bg-blue'}`}
                            style={{ width: `${val}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="branch-perk-caption">
                        <span>Perk: <strong>+15% XP on {skill.replace(/([A-Z])/g, ' $1')} Quests</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LEARNING VITAL STATS */}
          <div className="card mt-6">
            <div className="section-header">
              <h2>
                <BookOpen size={20} className="text-purple" />
                LEARNING MILESTONE METRICS
              </h2>
            </div>
            <div className="vitals-stats-grid">
              <div className="vital-box">
                <span className="vital-num text-purple">12</span>
                <span className="vital-lbl">Courses Completed</span>
              </div>
              <div className="vital-box">
                <span className="vital-num text-mint">45</span>
                <span className="vital-lbl">Quizzes Passed</span>
              </div>
              <div className="vital-box">
                <span className="vital-num text-gold">3</span>
                <span className="vital-lbl">Certifications Earned</span>
              </div>
              <div className="vital-box">
                <span className="vital-num text-coral">142h</span>
                <span className="vital-lbl">Total Time Invested</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CERTIFICATES & TOP ACHIEVEMENTS */}
        <div className="profile-col-certifications">
          {/* VERIFIED CERTIFICATES SHOWCASE */}
          <div className="card certs-showcase-card">
            <div className="section-header">
              <h2>
                <ShieldCheck size={20} className="text-mint" />
                VERIFIED CREDENTIALS
              </h2>
              <span className="tag tag-green">3 Active</span>
            </div>

            <div className="certs-list-stack">
              {certificates.map(cert => (
                <div key={cert.id} className="cert-item-card">
                  <div className="cert-icon-seal">
                    <Award size={22} />
                  </div>
                  <div className="cert-info">
                    <h4 className="cert-title">{cert.title}</h4>
                    <span className="cert-issuer">{cert.issuer} • Issued {cert.date}</span>
                    <span className="cert-grade">{cert.grade}</span>
                  </div>
                  <button className="cert-view-btn" title="View Credential">
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* TOP ACHIEVEMENTS SPOTLIGHT */}
          <div className="card top-badges-card mt-6">
            <div className="section-header">
              <h2>
                <Sparkles size={20} className="text-gold" />
                TROPHY SPOTLIGHT
              </h2>
              <span className="tag tag-gold">Top 4</span>
            </div>

            <div className="spotlight-badges-stack">
              {achievementsData.filter(a => !a.locked).slice(0, 4).map(achievement => (
                <div key={achievement.id} className="spotlight-badge-row">
                  <div className="spotlight-art">
                    <CollectibleBadge 
                      icon={<Award size={18} />} 
                      rarity={achievement.rarity} 
                      size={48} 
                    />
                  </div>
                  <div className="spotlight-text">
                    <h4 className="spotlight-name">{achievement.title}</h4>
                    <p className="spotlight-desc">{achievement.description}</p>
                  </div>
                  <span className={`tag-micro tag-${achievement.rarity.toLowerCase()}`}>
                    {achievement.rarity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
