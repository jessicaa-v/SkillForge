import React from 'react';

/**
 * Category Illustrations & Badges with rich pastel gradients & crisp game aesthetics
 */

export const CategoryIllustration = ({ category, size = 56 }) => {
  const cat = (category || '').toLowerCase();
  
  if (cat.includes('communication')) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#F0ECFD" />
        <rect x="22" y="24" width="28" height="22" rx="8" fill="#7656E8" />
        <path d="M28 46L24 52L34 46H50" fill="#7656E8" />
        <rect x="36" y="34" width="28" height="22" rx="8" fill="#FFC857" />
        <path d="M58 56L62 62L52 56H36" fill="#FFC857" />
        <circle cx="44" cy="45" r="2" fill="#583E00" />
        <circle cx="50" cy="45" r="2" fill="#583E00" />
        <circle cx="56" cy="45" r="2" fill="#583E00" />
      </svg>
    );
  }

  if (cat.includes('leadership')) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#EBF6FE" />
        <path d="M40 18L46 32L61 34L50 45L53 60L40 52L27 60L30 45L19 34L34 32L40 18Z" fill="#63B8F5" />
        <path d="M40 24L44 34L54 35L47 43L49 53L40 47L31 53L33 43L26 35L36 34L40 24Z" fill="#FFC857" />
        <circle cx="40" cy="40" r="6" fill="#FFFFFF" />
      </svg>
    );
  }

  if (cat.includes('compliance') || cat.includes('safety')) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#FFF8E6" />
        <path d="M40 20L58 26V42C58 53 50 61 40 64C30 61 22 53 22 42V26L40 20Z" fill="#FFC857" />
        <path d="M40 24L54 29V42C54 50 48 57 40 59C32 57 26 50 26 42V29L40 24Z" fill="#FFA000" />
        <path d="M33 42L38 47L48 35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (cat.includes('onboarding')) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#E7F9F4" />
        {/* Rocket / Launch */}
        <path d="M40 18C48 24 52 36 52 46H28C28 36 32 24 40 18Z" fill="#50C9A7" />
        <circle cx="40" cy="34" r="5" fill="#FFFFFF" />
        <path d="M28 44L18 52L24 55L30 49" fill="#FF897A" />
        <path d="M52 44L62 52L56 55L50 49" fill="#FF897A" />
        <path d="M36 46C36 54 40 62 40 62C40 62 44 54 44 46H36Z" fill="#FFC857" />
      </svg>
    );
  }

  if (cat.includes('technical') || cat.includes('problem')) {
    return (
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#F0ECFD" />
        <rect x="22" y="24" width="36" height="26" rx="6" fill="#7656E8" />
        <rect x="26" y="28" width="28" height="18" rx="3" fill="#1E163B" />
        <path d="M31 37L35 34L31 31" stroke="#50C9A7" strokeWidth="2" strokeLinecap="round" />
        <line x1="38" y1="39" x2="45" y2="39" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 50H48V56H32V50Z" fill="#DECFC0" />
        <rect x="28" y="56" width="24" height="4" rx="2" fill="#5538BF" />
      </svg>
    );
  }

  // Default / Performance
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="36" fill="#FFF0EE" />
      <path d="M26 54V40H34V54H26Z" fill="#63B8F5" rx="3" />
      <path d="M36 54V32H44V54H36Z" fill="#FFC857" rx="3" />
      <path d="M46 54V22H54V54H46Z" fill="#FF897A" rx="3" />
      <path d="M24 34L38 24L48 28L58 18" stroke="#50C9A7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="58" cy="18" r="4" fill="#50C9A7" />
    </svg>
  );
};

/**
 * Flame Streak Component
 */
export const FlameStreak = ({ days = 7, size = 36 }) => {
  return (
    <div className="flex items-center gap-2" style={{ display: 'inline-flex' }}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(255, 137, 122, 0.4))' }}>
        <path d="M24 4C24 4 15 15 15 26C15 34 20 40 24 42C28 40 33 34 33 26C33 15 24 4 24 4Z" fill="url(#flameGrad)" />
        <path d="M24 16C24 16 19 23 19 29C19 33.5 21.5 37 24 38C26.5 37 29 33.5 29 29C29 23 24 16 24 16Z" fill="#FFF176" />
        <circle cx="24" cy="30" r="3.5" fill="#FFFFFF" />
        <defs>
          <linearGradient id="flameGrad" x1="24" y1="4" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF897A" />
            <stop offset="0.5" stopColor="#FFA000" />
            <stop offset="1" stopColor="#FF5722" />
          </linearGradient>
        </defs>
      </svg>
      <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, color: '#D94835', fontSize: '1.25rem' }}>
        {days}
      </span>
    </div>
  );
};

/**
 * Collectible Badge Icon
 */
export const CollectibleBadge = ({ icon, rarity = 'common', locked = false, size = 80 }) => {
  const rarityColors = {
    common: { bg1: '#ECE8F5', bg2: '#D4CCE5', border: '#BDB3D1', glow: 'rgba(189, 179, 209, 0.3)', star: '#8B7FA8' },
    rare: { bg1: '#E0F2FE', bg2: '#7DD3FC', border: '#0284C7', glow: 'rgba(56, 189, 248, 0.45)', star: '#0284C7' },
    epic: { bg1: '#EDE9FE', bg2: '#C4B5FD', border: '#7C3AED', glow: 'rgba(124, 58, 237, 0.45)', star: '#7C3AED' },
    legendary: { bg1: '#FEF3C7', bg2: '#FCD34D', border: '#D97706', glow: 'rgba(245, 158, 11, 0.55)', star: '#B45309' },
  };

  const scheme = rarityColors[rarity.toLowerCase()] || rarityColors.common;

  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: locked ? 'grayscale(0.85) opacity(0.65)' : `drop-shadow(0 8px 16px ${scheme.glow})`
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id={`badgeGrad-${rarity}`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor={scheme.bg1} />
            <stop offset="1" stopColor={scheme.bg2} />
          </linearGradient>
        </defs>

        {/* Shield / Octagon Badge Base */}
        <polygon 
          points="50,6 88,22 88,68 50,94 12,68 12,22" 
          fill={`url(#badgeGrad-${rarity})`}
          stroke={scheme.border}
          strokeWidth="4"
        />

        {/* Inner Facet Lines */}
        <polygon 
          points="50,14 80,26 80,64 50,86 20,64 20,26" 
          fill="none"
          stroke={scheme.border}
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Stars on Top */}
        {rarity.toLowerCase() === 'legendary' && (
          <path d="M50 14L52 18L56 19L53 22L54 26L50 24L46 26L47 22L44 19L48 18Z" fill="#D97706" />
        )}
      </svg>
      <div 
        style={{ 
          position: 'absolute', 
          zIndex: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: scheme.star
        }}
      >
        {icon}
      </div>
    </div>
  );
};
