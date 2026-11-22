import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../animations/gsapConfig';

/**
 * usePageTransition hook
 * Automatically scrolls to top and refreshes ScrollTrigger instances on route change.
 */
export default function usePageTransition() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top smoothly
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Refresh GSAP ScrollTrigger calculations for new page layout
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);
}
