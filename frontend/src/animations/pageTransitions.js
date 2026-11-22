/**
 * pageTransitions.js
 * Smooth Framer Motion and GSAP page transitions.
 * Zero white flash, gentle vertical drift, seamless opacity restoration.
 */

export const pageTransitionVariants = {
  initial: {
    opacity: 0,
    y: 28
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const staggerContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const staggerItemVariants = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
