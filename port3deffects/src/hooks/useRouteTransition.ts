import { RefObject } from 'react';
import { gsap, useGSAP, prefersReducedMotion, refreshScrollTriggers, GSAP_DEFAULTS } from '../animations/gsapConfig';

export interface RouteTransitionOptions {
  duration?: number;
  y?: number;
}

/**
 * Hook for smooth animated entrance on page / route mount
 */
export const useRouteTransition = (
  containerRef: RefObject<HTMLElement | null>,
  key?: string,
  options: RouteTransitionOptions = {}
): void => {
  const { duration = GSAP_DEFAULTS.duration.normal, y = 16 } = options;

  useGSAP(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: GSAP_DEFAULTS.ease.smooth,
        onComplete: () => {
          refreshScrollTriggers();
        },
      }
    );
  }, { scope: containerRef, dependencies: [key] });
};
