import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger globally with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Configure default GSAP settings for silky luxury motion
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.75
  });

  // Optimize ScrollTrigger refresh
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    ignoreMobileResize: true
  });
}

// Custom curated easing curves
export const EASINGS = {
  luxury: 'power3.out',
  smoothOut: 'power2.out',
  cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
  springy: 'back.out(1.4)',
  expo: 'expo.out'
};

// Check if user has requested reduced motion
export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export { gsap, ScrollTrigger };
export default gsap;
