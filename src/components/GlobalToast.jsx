import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Star } from 'lucide-react';
import './LevelUpModal.css'; // Reusing some CSS

const GlobalToast = () => {
  const { state, dispatch } = useAppContext();
  const { toast } = state;

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_TOAST' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  if (!toast) return null;

  return (
    <div className="xp-reward-toast animate-slide-up" style={{ position: 'fixed', bottom: '2rem', zIndex: 9999 }}>
      <div className="xp-reward-content">
        <Star size={32} className="text-gold reward-icon" />
        <div className="xp-reward-text">
          <span className="xp-earned-title">{toast.title}</span>
          <span className="xp-earned-amount text-gold">+{toast.amount} XP</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalToast;
