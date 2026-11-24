import { useAppContext } from '../context/AppContext';
import { Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import { ForgeMascot } from './ForgeMascot';
import './LevelUpModal.css';

const LevelUpModal = () => {
  const { state, dispatch } = useAppContext();
  const { levelUpData } = state;

  if (!levelUpData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-pop level-up-modal text-center">
        {/* CSS Confetti Celebration */}
        <div className="confetti-container">
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
          <div className="confetti"></div>
        </div>

        {/* Mascot in celebration pose */}
        <div className="modal-mascot-box">
          <ForgeMascot pose="celebrate" size={130} />
        </div>
        
        <div className="level-celebration-title">
          <span className="celebration-badge">
            <Sparkles size={16} /> LEVEL ACQUIRED!
          </span>
          <h2 className="level-number-title">Level {levelUpData.level} Reached!</h2>
          <p className="level-sub">Congratulations! You've unlocked new abilities and platform privileges.</p>
        </div>
        
        <div className="rewards-box">
          <p className="rewards-title">
            <Trophy size={16} className="text-gold" /> Rewards & Perks Unlocked:
          </p>
          <ul className="rewards-list">
            {levelUpData.rewards.map((reward, i) => (
              <li key={i} className="reward-li">
                <CheckCircle2 size={16} className="text-mint" />
                <span>{reward}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          className="btn btn-gold btn-large mt-6 w-full"
          onClick={() => dispatch({ type: 'CLEAR_LEVEL_UP' })}
        >
          <Sparkles size={18} /> Claim Rewards & Continue!
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
