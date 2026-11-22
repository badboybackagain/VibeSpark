import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ScrollReveal component
 * High-performance, silky smooth viewport entrance wrapper using Framer Motion.
 * Respects prefers-reduced-motion and avoids layout shifts.
 */
export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  distance = 28,
  className = '',
  style = {},
  cascade = false,
  staggerChildren = 0.08,
  threshold = 0.15,
  once = false
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  // Curated luxury easing curve (easeOutQuart)
  const luxuryEase = [0.16, 1, 0.3, 1];

  const getVariants = () => {
    switch (variant) {
      case 'fadeUp':
        return {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration,
              delay,
              ease: luxuryEase,
              ...(cascade && { staggerChildren, delayChildren: delay })
            }
          }
        };
      case 'fadeDown':
        return {
          hidden: { opacity: 0, y: -distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, delay, ease: luxuryEase }
          }
        };
      case 'fadeLeft':
        return {
          hidden: { opacity: 0, x: distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: luxuryEase }
          }
        };
      case 'fadeRight':
        return {
          hidden: { opacity: 0, x: -distance },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, delay, ease: luxuryEase }
          }
        };
      case 'zoomIn':
        return {
          hidden: { opacity: 0, scale: 0.94, y: distance / 2 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration, delay, ease: luxuryEase }
          }
        };
      case 'stagger':
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren,
              delayChildren: delay
            }
          }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, delay, ease: luxuryEase }
          }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: '-40px' }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for staggered lists
 */
export function ScrollRevealItem({
  children,
  className = '',
  distance = 20,
  duration = 0.55
}) {
  const luxuryEase = [0.16, 1, 0.3, 1];

  const itemVariants = {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: luxuryEase }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
