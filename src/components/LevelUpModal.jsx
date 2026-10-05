import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import './LevelUpModal.css';

const LevelUpModal = () => {
  const { state, dispatch } = useAppContext();
  const { levelUpData } = state;

  if (!levelUpData) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-slide-up level-up-modal text-center">
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
        
        <h2>🎉 LEVEL UP!</h2>
        <h3 className="text-xl mb-6 mt-2">You reached Level {levelUpData.level}!</h3>
        
        <div className="rewards-box">
          <p className="font-semibold mb-2">Rewards unlocked:</p>
          <ul className="rewards-list">
            {levelUpData.rewards.map((reward, i) => (
              <li key={i}>💎 {reward}</li>
            ))}
          </ul>
        </div>
        
        <button 
          className="btn btn-primary mt-6 w-full"
          onClick={() => dispatch({ type: 'CLEAR_LEVEL_UP' })}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
};

export default LevelUpModal;
