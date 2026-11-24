import React from 'react';

/**
 * ForgeMascot: Sparky the Blacksmith Bot Companion
 * Poses: 'welcome' | 'celebrate' | 'thinking' | 'learning' | 'cheering' | 'compact'
 */
export const ForgeMascot = ({ pose = 'welcome', size = 120, className = '' }) => {
  // Eye and accessory variations depending on pose
  return (
    <div 
      className={`forge-mascot-container ${className}`}
      style={{ 
        width: size, 
        height: size, 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        filter: 'drop-shadow(0 10px 18px rgba(118, 86, 232, 0.22))'
      }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="floating-mascot"
      >
        <defs>
          {/* Main Bot Gradient */}
          <linearGradient id="botPurple" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#9677FA" />
            <stop offset="0.6" stopColor="#7656E8" />
            <stop offset="1" stopColor="#5538BF" />
          </linearGradient>

          {/* Golden Accents Gradient */}
          <linearGradient id="goldGlow" x1="40" y1="20" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFE082" />
            <stop offset="0.5" stopColor="#FFC857" />
            <stop offset="1" stopColor="#FFA000" />
          </linearGradient>

          {/* Mint Glow Gradient */}
          <linearGradient id="mintGlow" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#80E9CC" />
            <stop offset="1" stopColor="#50C9A7" />
          </linearGradient>

          {/* Visor Screen Gradient */}
          <linearGradient id="visorScreen" x1="40" y1="40" x2="120" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1E163B" />
            <stop offset="1" stopColor="#2E2356" />
          </linearGradient>

          {/* Hammer Steel */}
          <linearGradient id="steelGrad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Floating Sparks / Stars in Background */}
        <g className="sparkle-icon">
          <path d="M25 45L27 38L34 36L27 34L25 27L23 34L16 36L23 38Z" fill="#FFC857" />
          <path d="M138 35L139.5 30L144.5 28.5L139.5 27L138 22L136.5 27L131.5 28.5L136.5 30Z" fill="#63B8F5" />
          <circle cx="135" cy="85" r="3" fill="#FF897A" />
          <circle cx="28" cy="110" r="2.5" fill="#50C9A7" />
        </g>

        {/* Bot Shadow */}
        <ellipse cx="80" cy="148" rx="38" ry="7" fill="rgba(44, 33, 66, 0.15)" />

        {/* Head Antenna / Blacksmith Spark Forge */}
        <path d="M80 32V18" stroke="#7656E8" strokeWidth="5" strokeLinecap="round" />
        <circle cx="80" cy="15" r="7" fill="url(#goldGlow)" filter="url(#softGlow)" />
        <circle cx="80" cy="15" r="3.5" fill="#FFFDF0" />

        {/* Bot Ears / Bolt Caps */}
        <rect x="25" y="58" width="10" height="20" rx="4" fill="url(#goldGlow)" />
        <rect x="125" y="58" width="10" height="20" rx="4" fill="url(#goldGlow)" />
        <circle cx="30" cy="68" r="2" fill="#5A3A00" />
        <circle cx="130" cy="68" r="2" fill="#5A3A00" />

        {/* Bot Head Outline */}
        <rect x="32" y="32" width="96" height="74" rx="28" fill="url(#botPurple)" />
        {/* Head highlight shine */}
        <path d="M48 40C60 36 100 36 112 40" stroke="#B8A2FA" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

        {/* Visor Screen */}
        <rect x="42" y="44" width="76" height="48" rx="18" fill="url(#visorScreen)" stroke="#503A9E" strokeWidth="2" />

        {/* Eyes based on Pose */}
        {pose === 'celebrate' ? (
          // Joyful arched eyes ^^
          <g>
            <path d="M54 68C58 60 66 60 70 68" stroke="#50C9A7" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M90 68C94 60 102 60 106 68" stroke="#50C9A7" strokeWidth="4.5" strokeLinecap="round" />
            {/* Rosy cheeks */}
            <circle cx="50" cy="74" r="4" fill="#FF897A" opacity="0.6" />
            <circle cx="110" cy="74" r="4" fill="#FF897A" opacity="0.6" />
            {/* Open happy smile */}
            <path d="M74 74C76 79 84 79 86 74" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ) : pose === 'thinking' ? (
          // Curious eyes (one bigger, looking up)
          <g>
            <circle cx="62" cy="64" r="7" fill="#63B8F5" />
            <circle cx="64" cy="62" r="2.5" fill="#FFFFFF" />
            <circle cx="98" cy="62" r="8" fill="#63B8F5" />
            <circle cx="100" cy="60" r="3" fill="#FFFFFF" />
            {/* Puzzled mouth */}
            <ellipse cx="80" cy="76" rx="4" ry="2" fill="#FFC857" />
            {/* Floating idea spark */}
            <path d="M120 20L122 14L128 12L122 10L120 4L118 10L112 12L118 14Z" fill="#FFC857" filter="url(#softGlow)" />
          </g>
        ) : pose === 'learning' ? (
          // Focused cute eyes with glasses/visor HUD
          <g>
            <circle cx="62" cy="66" r="6" fill="#50C9A7" />
            <circle cx="64" cy="64" r="2" fill="#FFFFFF" />
            <circle cx="98" cy="66" r="6" fill="#50C9A7" />
            <circle cx="100" cy="64" r="2" fill="#FFFFFF" />
            {/* Smart golden glasses frame */}
            <rect x="52" y="56" width="20" height="18" rx="6" stroke="#FFC857" strokeWidth="2.5" fill="none" />
            <rect x="88" y="56" width="20" height="18" rx="6" stroke="#FFC857" strokeWidth="2.5" fill="none" />
            <path d="M72 65H88" stroke="#FFC857" strokeWidth="2.5" />
            {/* Smile */}
            <path d="M75 77C77 80 83 80 85 77" stroke="#FFC857" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : (
          // Welcome / Default Big Sparkly Eyes
          <g>
            <circle cx="62" cy="66" r="7.5" fill="#50C9A7" />
            <circle cx="64.5" cy="63.5" r="3" fill="#FFFFFF" />
            <circle cx="60.5" cy="68.5" r="1.5" fill="#FFFFFF" />

            <circle cx="98" cy="66" r="7.5" fill="#50C9A7" />
            <circle cx="100.5" cy="63.5" r="3" fill="#FFFFFF" />
            <circle cx="96.5" cy="68.5" r="1.5" fill="#FFFFFF" />

            {/* Cute rosy cheeks */}
            <circle cx="50" cy="74" r="4.5" fill="#FF897A" opacity="0.7" />
            <circle cx="110" cy="74" r="4.5" fill="#FF897A" opacity="0.7" />

            {/* Cheerful curve smile */}
            <path d="M73 74C76 80 84 80 87 74" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {/* Bot Body & Torso */}
        <path d="M52 102C52 98 108 98 108 102L114 134C114 140 106 144 80 144C54 144 46 140 46 134L52 102Z" fill="url(#botPurple)" />

        {/* Blacksmith Apron / Golden Core Plate */}
        <path d="M60 106H100L96 138H64L60 106Z" fill="#FDF8F0" opacity="0.9" rx="4" />
        <path d="M60 106L68 118" stroke="#FFC857" strokeWidth="2.5" />
        <path d="M100 106L92 118" stroke="#FFC857" strokeWidth="2.5" />

        {/* Forge Chest Power Core */}
        <circle cx="80" cy="124" r="8" fill="url(#goldGlow)" filter="url(#softGlow)" />
        <path d="M80 119L81.5 123L85.5 124L81.5 125L80 129L78.5 125L74.5 124L78.5 123Z" fill="#FFFFFF" />

        {/* Left Arm & Prop */}
        {pose === 'welcome' ? (
          // Waving left hand
          <g>
            <path d="M48 108C36 104 22 92 20 80C19 76 25 74 28 78C32 84 40 96 48 104" stroke="#7656E8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="22" cy="76" r="6" fill="url(#goldGlow)" />
          </g>
        ) : pose === 'celebrate' ? (
          // Hands held up high in victory!
          <g>
            <path d="M50 108C38 98 28 82 26 66" stroke="#7656E8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="26" cy="64" r="6" fill="url(#goldGlow)" />
            {/* Tiny golden trophy in left hand */}
            <path d="M18 52H28L26 60H20L18 52Z" fill="#FFC857" />
          </g>
        ) : pose === 'thinking' ? (
          // Arm resting on hip
          <g>
            <path d="M50 108C40 114 36 126 44 132" stroke="#7656E8" strokeWidth="7" strokeLinecap="round" />
            <circle cx="45" cy="132" r="5" fill="url(#goldGlow)" />
          </g>
        ) : pose === 'learning' ? (
          // Holding learning scroll/book
          <g>
            <path d="M50 110C42 116 38 124 50 128" stroke="#7656E8" strokeWidth="7" strokeLinecap="round" />
            {/* Scroll/Book */}
            <rect x="42" y="118" width="30" height="20" rx="3" fill="#63B8F5" transform="rotate(-10 42 118)" />
            <line x1="46" y1="124" x2="66" y2="120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="129" x2="64" y2="126" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : (
          <g>
            <path d="M50 108C42 114 38 124 44 132" stroke="#7656E8" strokeWidth="7" strokeLinecap="round" />
            <circle cx="44" cy="132" r="5" fill="url(#goldGlow)" />
          </g>
        )}

        {/* Right Arm & Prop */}
        {pose === 'celebrate' ? (
          // Right arm up with a star
          <g>
            <path d="M110 108C122 98 132 82 134 66" stroke="#7656E8" strokeWidth="8" strokeLinecap="round" />
            <circle cx="134" cy="64" r="6" fill="url(#goldGlow)" />
            <path d="M134 46L136 52L142 53L137 57L139 63L134 59L129 63L131 57L126 53L132 52Z" fill="#FFC857" filter="url(#softGlow)" />
          </g>
        ) : pose === 'thinking' ? (
          // Right hand tapping chin
          <g>
            <path d="M110 108C116 98 114 84 100 80" stroke="#7656E8" strokeWidth="7" strokeLinecap="round" />
            <circle cx="98" cy="80" r="5" fill="url(#goldGlow)" />
          </g>
        ) : (
          // Blacksmith Hammer in right hand (Signature SkillForge Forge Hammer)
          <g>
            <path d="M110 110C118 118 128 122 132 118" stroke="#7656E8" strokeWidth="7" strokeLinecap="round" />
            {/* Hammer Handle */}
            <line x1="128" y1="134" x2="142" y2="92" stroke="#A77B4A" strokeWidth="4" strokeLinecap="round" />
            {/* Hammer Head */}
            <rect x="132" y="86" width="20" height="12" rx="3" fill="url(#goldGlow)" transform="rotate(-18 132 86)" />
            {/* Glowing forge spark on hammer head */}
            <circle cx="146" cy="85" r="3" fill="#FFFDF0" filter="url(#softGlow)" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default ForgeMascot;
