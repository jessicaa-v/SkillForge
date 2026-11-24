import { useState } from 'react';
import { Lock, Star, Flame, Brain, Zap, Shield, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { CollectibleBadge } from '../components/GameIcons';
import { ForgeMascot } from '../components/ForgeMascot';
import './Achievements.css';

const iconComponents = {
  Star: <Star size={26} />,
  Flame: <Flame size={26} />,
  Brain: <Brain size={26} />,
  Zap: <Zap size={26} />,
  Shield: <Shield size={26} />,
  Trophy: <Trophy size={26} />
};

const Achievements = () => {
  const { state } = useAppContext();
  const achievementsData = state.achievements || [];
  const [filter, setFilter] = useState('All');

  const unlockedCount = achievementsData.filter(a => !a.locked).length;
  const totalCount = achievementsData.length;
  const completionPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredAchievements = achievementsData.filter(achievement => {
    if (filter === 'All') return true;
    if (filter === 'Unlocked') return !achievement.locked;
    if (filter === 'Locked') return achievement.locked;
    if (filter === 'Rare') return achievement.rarity === 'Rare';
    if (filter === 'Epic') return achievement.rarity === 'Epic';
    if (filter === 'Legendary') return achievement.rarity === 'Legendary';
    return true;
  });

  return (
    <div className="achievements-gallery animate-slide-up">
      {/* Header Banner */}
      <div className="achievements-hero card">
        <div className="hero-left-info">
          <div className="header-pill">
            <Trophy size={14} className="text-gold" /> TROPHY ROOM & RELICS
          </div>
          <h1 className="achievements-title">Achievement Showcase</h1>
          <p className="achievements-sub">
            Collect prestigious badges, immortalize your learning milestones, and showcase your workplace mastery.
          </p>

          <div className="achievements-stats-strip">
            <div className="a-stat-box">
              <span className="a-stat-val text-purple">{unlockedCount} / {totalCount}</span>
              <span className="a-stat-lbl">Badges Unlocked</span>
            </div>
            <div className="a-stat-box">
              <span className="a-stat-val text-gold">{completionPercent}%</span>
              <span className="a-stat-lbl">Collection Rate</span>
            </div>
            <div className="a-stat-box">
              <span className="a-stat-val text-mint">2 Rare • 2 Epic</span>
              <span className="a-stat-lbl">High Rarity Badges</span>
            </div>
          </div>
        </div>

        <div className="hero-right-mascot">
          <ForgeMascot pose="celebrate" size={140} />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="achievements-tabs-bar">
        {['All', 'Unlocked', 'Locked', 'Rare', 'Epic', 'Legendary'].map(tab => (
          <button 
            key={tab} 
            className={`achieve-tab-btn ${filter === tab ? 'active' : ''}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="badges-gallery-grid">
        {filteredAchievements.map((achievement) => {
          const isLocked = achievement.locked;
          const rarity = achievement.rarity.toLowerCase();

          return (
            <div 
              key={achievement.id} 
              className={`badge-item-card card card-hover rarity-border-${rarity} ${isLocked ? 'is-locked-card' : ''}`}
            >
              {/* Rarity Ribbon */}
              <div className="badge-ribbon-row">
                <span className={`tag rarity-tag tag-${rarity}`}>
                  {achievement.rarity}
                </span>
                {!isLocked && (
                  <span className="earned-check-chip">
                    <CheckCircle2 size={13} /> Unlocked
                  </span>
                )}
              </div>

              {/* Central Badge Collectible */}
              <div className="badge-visual-wrapper">
                <CollectibleBadge 
                  icon={iconComponents[achievement.icon] || <Star size={26} />} 
                  rarity={achievement.rarity} 
                  locked={isLocked}
                  size={96}
                />
                {isLocked && (
                  <div className="badge-locked-padlock">
                    <Lock size={20} />
                  </div>
                )}
              </div>
              
              {/* Info Details */}
              <div className="badge-body-text">
                <h3 className="badge-card-name">{achievement.title}</h3>
                <p className="badge-card-desc">{achievement.description}</p>
              </div>

              {/* Progress or Date Earned */}
              <div className="badge-card-footer">
                {isLocked ? (
                  <div className="badge-progress-wrap">
                    <div className="b-progress-row">
                      <span>Milestone Progress</span>
                      <strong>{achievement.progress} / {achievement.total}</strong>
                    </div>
                    <div className="progress-bar-bg small">
                      <div 
                        className="progress-bar-fill bg-gold" 
                        style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div className="badge-earned-date">
                    <Sparkles size={14} className="text-gold" />
                    <span>Unlocked on {achievement.date}</span>
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

export default Achievements;
