import { gsap, ScrollTrigger, EASINGS, isReducedMotion } from './gsapConfig';

/**
 * scrollAnimations.js
 * Centralized ScrollTrigger manager for sections, cards, and image parallax.
 */

export const createScrollTrigger = (element, options = {}) => {
  if (!element || isReducedMotion()) return null;

  return ScrollTrigger.create({
    trigger: element,
    start: options.start || 'top 85%',
    end: options.end || 'bottom 15%',
    toggleActions: options.toggleActions || 'play none none none',
    once: options.once !== false,
    ...options
  });
};

/**
 * Setup a batch reveal for cards or grids
 */
export const setupBatchReveal = (targets, options = {}) => {
  if (!targets || isReducedMotion()) return null;

  return ScrollTrigger.batch(targets, {
    start: options.start || 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.fromTo(
        batch,
        {
          opacity: 0,
          y: options.distance || 32,
          scale: options.scale || 0.97
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.65,
          stagger: options.stagger || 0.08,
          ease: options.ease || EASINGS.luxury,
          overwrite: 'auto'
        }
      );
    }
  });
};

/**
 * Setup subtle background parallax on a container
 */
export const setupParallax = (bgElement, triggerElement, speed = 0.2) => {
  if (!bgElement || !triggerElement || isReducedMotion()) return null;

  return gsap.to(bgElement, {
    yPercent: -speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: triggerElement,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  });
};
