import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASINGS, isReducedMotion } from '../animations/gsapConfig';

/**
 * useScrollReveal hook
 * Automatically attaches a ScrollTrigger fadeUp/scale animation with gsap.context cleanup.
 */
export default function useScrollReveal(options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: options.distance ?? 32,
          scale: options.scale ?? 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration || 0.75,
          ease: options.ease || EASINGS.luxury,
          delay: options.delay || 0,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: el,
            start: options.start || 'top 88%',
            once: options.once !== false
          }
        }
      );
    }, el);

    return () => ctx.revert();
  }, [options.distance, options.scale, options.duration, options.ease, options.delay, options.start, options.once]);

  return elementRef;
}
