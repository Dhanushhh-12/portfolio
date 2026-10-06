import { RefObject, useEffect } from 'react';
import { gsap, useGSAP, prefersReducedMotion, refreshScrollTriggers, GSAP_DEFAULTS } from '../animations/gsapConfig';
import { createHeroTimeline } from '../animations/variants/hero';

/**
 * Reusable hook to trigger ScrollTrigger refresh on state/route change
 */
export const useScrollTriggerRefresh = (deps: any[] = []): void => {
  useEffect(() => {
    refreshScrollTriggers();
  }, deps);
};

/**
 * Hook for Hero Section multi-element entrance timeline
 */
export const useHeroEntrance = (scopeRef: RefObject<HTMLElement | null>): void => {
  useGSAP(() => {
    if (prefersReducedMotion() || !scopeRef.current) return;
    createHeroTimeline(scopeRef.current);
  }, { scope: scopeRef });
};

/**
 * Hook for Navbar entrance animation
 */
export const useNavbarReveal = (headerRef: RefObject<HTMLElement | null>): void => {
  useGSAP(() => {
    if (prefersReducedMotion() || !headerRef.current) return;

    const tl: gsap.core.Timeline = gsap.timeline({
      defaults: { ease: GSAP_DEFAULTS.ease.smooth },
    });

    tl.fromTo(
      headerRef.current,
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
    ).fromTo(
      '.nav-link-item',
      { y: -8, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 },
      '-=0.4'
    );
  }, { scope: headerRef });
};
