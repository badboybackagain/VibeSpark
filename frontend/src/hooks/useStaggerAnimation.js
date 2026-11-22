import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASINGS, isReducedMotion } from '../animations/gsapConfig';

/**
 * useStaggerAnimation hook
 * Automatically animates child elements with staggered entrance on scroll.
 */
export default function useStaggerAnimation(selector = ':scope > *', options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || isReducedMotion()) return;

    const targets = container.querySelectorAll(selector);
    if (!targets || targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: options.distance || 30,
          scale: options.scale || 0.96
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.65,
          stagger: options.stagger || 0.08,
          ease: options.ease || EASINGS.luxury,
          scrollTrigger: {
            trigger: container,
            start: options.start || 'top 88%',
            once: true
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, [selector, options.distance, options.scale, options.duration, options.stagger, options.start]);

  return containerRef;
}
