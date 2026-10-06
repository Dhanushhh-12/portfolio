import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins globally once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * Standard GSAP easing curves and durations for a consistent, premium feel
 */
export const GSAP_DEFAULTS = {
  ease: {
    smooth: 'power3.out',
    snappy: 'power2.out',
    gentle: 'sine.out',
    bounce: 'back.out(1.4)',
    inOut: 'power2.inOut',
  },
  duration: {
    micro: 0.2,
    fast: 0.4,
    normal: 0.7,
    slow: 1.0,
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    relaxed: 0.12,
  },
};

/**
 * Check if the user has requested reduced motion for accessibility compliance
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Safely recalculate all ScrollTrigger start/end coordinates on layout or route changes
 */
export const refreshScrollTriggers = (): void => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
};

export { gsap, ScrollTrigger, useGSAP };
