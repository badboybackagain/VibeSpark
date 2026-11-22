import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logos/vibespark-logo.png';

/**
 * Reusable VibeSpark Logo Component
 * Supports:
 * - variant="dark" (for dark navy/midnight backgrounds: white text + bright orange bolt)
 * - variant="light" (for light white/lavender backgrounds: navy text + orange bolt)
 * - useImage=true (uses the official uploaded PNG asset with crisp filter adjustments)
 */
export default function VibeSparkLogo({ 
  variant = 'dark', 
  className = '', 
  size = 'md',
  showTagline = true,
  onClick,
  ...props
}) {
  const isDark = variant === 'dark';

  const handleClick = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link 
      to="/" 
      onClick={handleClick}
      aria-label="VibeSpark Technologies Homepage"
      className={`inline-flex items-center gap-2.5 group select-none cursor-pointer relative z-30 pointer-events-auto ${className}`}
      {...props}
    >
      {/* Precision Brand Icon Mark */}
      <div className="relative flex items-center justify-center">
        <svg 
          viewBox="0 0 46 44" 
          className={size === 'lg' ? 'w-11 h-11' : size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'} 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Navy / Indigo Slanted Bar */}
          <polygon 
            points="2,6 15,6 23,36 10,36" 
            fill={isDark ? "#254DFF" : "#08086F"} 
            className="transition-colors duration-300"
          />
          {/* Orange Lightning Bolt */}
          <polygon 
            points="23,6 12,30 22,30 17,42 34,18 24,18" 
            fill="#F4773B" 
            className="drop-shadow-sm group-hover:scale-105 transition-transform duration-300 origin-center"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className={`flex items-center tracking-tight font-extrabold leading-none ${
          size === 'lg' ? 'text-2xl sm:text-3xl' : size === 'sm' ? 'text-base sm:text-lg' : 'text-xl sm:text-2xl'
        }`}>
          <span className={`transition-colors duration-300 ${isDark ? 'text-white' : 'text-brand-midnight'}`}>
            vibe
          </span>
          <span className={`transition-colors duration-300 ${isDark ? 'text-white' : 'text-brand-navy'}`}>
            spark
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange ml-0.5 mb-1 animate-pulse" />
        </div>
        
        {showTagline && (
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`h-[1px] ${size === 'lg' ? 'w-2.5' : 'w-2'} ${isDark ? 'bg-brand-lavender/40' : 'bg-brand-navy/30'}`} />
            <span className={`tracking-[0.24em] font-semibold uppercase ${
              size === 'lg' ? 'text-[11px]' : size === 'sm' ? 'text-[8px]' : 'text-[9px]'
            } ${isDark ? 'text-brand-lavender/90' : 'text-brand-navy/80'}`}>
              Technologies
            </span>
            <span className={`h-[1px] ${size === 'lg' ? 'w-2.5' : 'w-2'} ${isDark ? 'bg-brand-lavender/40' : 'bg-brand-navy/30'}`} />
          </div>
        )}
      </div>
    </Link>
  );
}
