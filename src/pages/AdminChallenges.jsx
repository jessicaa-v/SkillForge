import { useState } from 'react';
import {
  Target,
  Trophy,
  Users,
  CheckCircle2,
  Sparkles,
  Clock,
  Medal,
  Flame,
  Zap
} from 'lucide-react';
import { adminChallengesData, adminAchievementsSummary } from '../data/adminMockData';
import './AdminDashboard.css';
import './AdminPages.css';

const AdminChallenges = () => {
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredChallenges = adminChallengesData.filter((ch) => {
    if (statusFilter === 'All') return true;
    return ch.status === statusFilter;
  });

  const activeCount = adminChallengesData.filter((c) => c.status === 'Active').length;
  const totalParticipants = adminChallengesData.reduce((sum, c) => sum + c.participants, 0);
  const totalCompleted = adminChallengesData.reduce((sum, c) => sum + c.completedCount, 0);
  const avgCompletionRate = totalParticipants > 0 ? Math.round((totalCompleted / totalParticipants) * 100) : 0;
  const totalBadgesUnlocked = adminAchievementsSummary.reduce((sum, a) => sum + a.unlockedCount, 0);

  const getRarityTag = (rarity) => {
    if (rarity === 'Legendary') return 'tag-gold';
    if (rarity === 'Epic') return 'tag-purple';
    if (rarity === 'Rare') return 'tag-blue';
    return 'tag-green';
  };

  return (
    <div className="admin-portal animate-slide-up">
      {/* Header */}
      <div className="admin-header-row">
        <div>
          <div className="header-pill">
            <Target size={14} className="text-purple" /> GAMIFICATION & ENGAGEMENT OPS
          </div>
          <h1 className="admin-main-title">Challenges & Achievements</h1>
          <p className="admin-sub">
            Track company-wide learning challenges, employee participation rates, completion status, and badge achievements.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="admin-kpi-grid">
        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-purple-soft">
              <Zap size={22} className="text-purple" />
            </div>
            <span className="tag tag-purple">Live Now</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{activeCount}</h3>
            <span className="kpi-label">Active Challenges</span>
          </div>
          <div className="kpi-footer-metric">
            <span>{adminChallengesData.length} total seasonal quests</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-blue-soft">
              <Users size={22} className="text-blue" />
            </div>
            <span className="trend-chip positive">High Opt-in</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value">{totalParticipants.toLocaleString()}</h3>
            <span className="kpi-label">Total Challenge Entries</span>
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
            <span className="trend-chip positive">{totalCompleted.toLocaleString()} finished</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-mint">{avgCompletionRate}%</h3>
            <span className="kpi-label">Challenge Completion Rate</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Participant finish ratio</span>
          </div>
        </div>

        <div className="kpi-card card card-hover">
          <div className="kpi-card-header">
            <div className="kpi-icon-pod bg-gold-soft">
              <Trophy size={22} className="text-gold" />
            </div>
            <span className="tag tag-gold">6 Badge Tiers</span>
          </div>
          <div className="kpi-card-content">
            <h3 className="kpi-value text-gold">{totalBadgesUnlocked.toLocaleString()}</h3>
            <span className="kpi-label">Achievements Unlocked</span>
          </div>
          <div className="kpi-footer-metric">
            <span>Cumulative workforce badges</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="admin-filter-bar">
        <div className="admin-filter-tabs">
          {['All', 'Active', 'Completed'].map((status) => (
            <button
              key={status}
              className={`admin-filter-pill ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'All' ? `All Challenges (${adminChallengesData.length})` : status}
            </button>
          ))}
        </div>

        <span className="text-sm font-bold" style={{ color: 'var(--color-text-secondary)' }}>
          Showing {filteredChallenges.length} {filteredChallenges.length === 1 ? 'challenge' : 'challenges'}
        </span>
      </div>

      {/* Challenges Grid */}
      <div className="admin-challenges-grid">
        {filteredChallenges.map((challenge) => {
          const participationPct = Math.round((challenge.participants / challenge.targetParticipants) * 100);
          const completionPct = Math.round((challenge.completedCount / challenge.participants) * 100);

          return (
            <div key={challenge.id} className="card card-hover admin-challenge-card">
              <div className="flex flex-col gap-3">
                <div className="admin-course-top-row">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="tag tag-purple">{challenge.type}</span>
                    <span className="tag tag-blue">{challenge.category}</span>
                  </div>
                  <span className={`status-pill ${challenge.status === 'Completed' ? 'pill-compliant' : 'pill-in-review'}`}>
                    {challenge.status}
                  </span>
                </div>

                <div>
                  <h3 className="admin-course-title">{challenge.title}</h3>
                  <p className="admin-course-desc mt-2">{challenge.description}</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="tag tag-gold"><Sparkles size={13} /> +{challenge.xpReward} XP</span>
                  <span className="tag tag-green">+{challenge.coinReward} Coins</span>
                  <span className="skill-mini-pill">Lead: {challenge.leadDepartment}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex justify-between items-center mb-2" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      Participation: {challenge.participants.toLocaleString()} / {challenge.targetParticipants.toLocaleString()}
                    </span>
                    <span className="text-purple">{participationPct}% Enrolled</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div className="progress-bar-fill bg-purple" style={{ width: `${Math.min(participationPct, 100)}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2" style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                    <span style={{ color: 'var(--color-text-secondary)' }}>
                      Completion Status: {challenge.completedCount.toLocaleString()} completed
                    </span>
                    <span style={{ color: '#15803D' }}>{completionPct}% Done</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div className="progress-bar-fill bg-green" style={{ width: `${Math.min(completionPct, 100)}%` }} />
                  </div>
                </div>

                <div className="kpi-footer-metric flex justify-between items-center" style={{ marginTop: '0.25rem' }}>
                  <span className="flex items-center gap-1"><Clock size={13} /> {challenge.deadline}</span>
                  <strong>{challenge.status === 'Completed' ? 'Rewards Distributed' : 'Tracking Live'}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Workforce Achievements Section */}
      <div className="card">
        <div className="section-header">
          <div>
            <h2><Medal size={20} className="text-gold" /> Workforce Achievements & Badge Distribution</h2>
            <p className="chart-sub">Organization-wide achievement unlock rates and recent badge earners</p>
          </div>
          <span className="tag tag-gold"><Flame size={13} /> Gamification Milestones</span>
        </div>

        <div className="admin-achievements-grid">
          {adminAchievementsSummary.map((ach) => {
            const unlockPct = Math.round((ach.unlockedCount / ach.totalEmployees) * 100);
            return (
              <div key={ach.id} className="skill-gap-item admin-achievement-card">
                <div className="skill-gap-top">
                  <span className="skill-gap-title">{ach.title}</span>
                  <span className={`tag ${getRarityTag(ach.rarity)}`}>{ach.rarity}</span>
                </div>
                <p className="admin-course-desc">{ach.description}</p>

                <div>
                  <div className="flex justify-between items-center mb-2" style={{ fontSize: '0.78rem', fontWeight: 800 }}>
                    <span>{ach.unlockedCount.toLocaleString()} / {ach.totalEmployees.toLocaleString()} employees</span>
                    <span className="text-purple">{unlockPct}%</span>
                  </div>
                  <div className="progress-bar-bg small">
                    <div
                      className={`progress-bar-fill ${ach.rarity === 'Legendary' ? 'bg-gold' : ach.rarity === 'Epic' ? 'bg-purple' : ach.rarity === 'Rare' ? 'bg-blue' : 'bg-green'}`}
                      style={{ width: `${unlockPct}%` }}
                    />
                  </div>
                </div>

                <div className="skill-gap-meta">
                  <span>Latest earner: <strong>{ach.recentEarner}</strong></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminChallenges;
