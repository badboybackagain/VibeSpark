import { useEffect, useRef } from 'react';
import { gsap, isReducedMotion } from '../animations/gsapConfig';

/**
 * useParallax hook
 * Smooth subtle vertical parallax on scroll for background visual elements.
 */
export default function useParallax(speed = 0.15) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(target, {
        yPercent: -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: target.parentElement || target,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, target);

    return () => ctx.revert();
  }, [speed]);

  return targetRef;
}
