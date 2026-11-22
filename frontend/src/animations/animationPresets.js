import { EASINGS, isReducedMotion } from './gsapConfig';

/**
 * Global reusable animation presets for GSAP ScrollTrigger and standalone tweens.
 * All presets respect prefers-reduced-motion.
 */

export const animationPresets = {
  // 1. Fade Up (standard section headings, body paragraphs, and intro blocks)
  fadeUp: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, y: options.distance || 36, ...options.from },
      to: {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.8,
        ease: options.ease || EASINGS.luxury,
        stagger: options.stagger || 0,
        delay: options.delay || 0,
        ...options.to
      }
    };
  },

  // 2. Fade In (subtle ambient reveals, overlays)
  fadeIn: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, ...options.from },
      to: {
        opacity: 1,
        duration: options.duration || 0.65,
        ease: options.ease || EASINGS.smoothOut,
        delay: options.delay || 0,
        ...options.to
      }
    };
  },

  // 3. Slide Left (elements sliding in from the right)
  slideLeft: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, x: options.distance || 50, ...options.from },
      to: {
        opacity: 1,
        x: 0,
        duration: options.duration || 0.8,
        ease: options.ease || EASINGS.luxury,
        ...options.to
      }
    };
  },

  // 4. Slide Right (elements sliding in from the left)
  slideRight: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, x: -(options.distance || 50), ...options.from },
      to: {
        opacity: 1,
        x: 0,
        duration: options.duration || 0.8,
        ease: options.ease || EASINGS.luxury,
        ...options.to
      }
    };
  },

  // 5. Scale Reveal (featured badges, circular icon pods, center highlights)
  scaleReveal: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, scale: options.initialScale || 0.92, ...options.from },
      to: {
        opacity: 1,
        scale: 1,
        duration: options.duration || 0.7,
        ease: options.ease || EASINGS.cinematic,
        ...options.to
      }
    };
  },

  // 6. Clip-Path Reveal (cinematic image reveals, photography panels)
  clipPathReveal: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: {
        clipPath: options.fromClip || 'inset(12% 0 12% 0 round 16px)',
        opacity: 0,
        scale: 1.05,
        ...options.from
      },
      to: {
        clipPath: 'inset(0% 0 0% 0 round 16px)',
        opacity: 1,
        scale: 1,
        duration: options.duration || 1.1,
        ease: options.ease || EASINGS.cinematic,
        ...options.to
      }
    };
  },

  // 7. Text Reveal (split or line-by-line heading emphasis)
  textReveal: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, y: 28, skewY: 2, ...options.from },
      to: {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: options.duration || 0.85,
        ease: options.ease || EASINGS.cinematic,
        ...options.to
      }
    };
  },

  // 8. Stagger Children (grids of cards, feature lists, stats)
  staggerChildren: (elements, options = {}) => {
    if (!elements || isReducedMotion()) return null;
    return {
      from: { opacity: 0, y: options.distance || 30, scale: 0.96, ...options.from },
      to: {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.65,
        stagger: options.stagger || 0.08,
        ease: options.ease || EASINGS.luxury,
        ...options.to
      }
    };
  },

  // 9. Image Parallax (controlled subtle parallax background)
  imageParallax: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      yPercent: options.yPercent || -12,
      ease: 'none'
    };
  },

  // 10. Card Hover (subtle lift + border illumination)
  cardHover: {
    scale: 1.025,
    y: -6,
    boxShadow: '0 20px 35px -10px rgba(64, 60, 255, 0.15)',
    duration: 0.3,
    ease: EASINGS.smoothOut
  },

  // 11. Section Reveal
  sectionReveal: (element, options = {}) => {
    if (!element || isReducedMotion()) return null;
    return {
      from: { opacity: 0, y: 40, ...options.from },
      to: {
        opacity: 1,
        y: 0,
        duration: options.duration || 0.9,
        ease: options.ease || EASINGS.luxury,
        ...options.to
      }
    };
  }
};

export default animationPresets;
