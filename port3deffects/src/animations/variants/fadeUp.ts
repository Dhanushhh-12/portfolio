import { gsap, GSAP_DEFAULTS, prefersReducedMotion } from '../gsapConfig';

export interface FadeUpOptions {
  y?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  trigger?: gsap.DOMTarget;
  start?: string;
  once?: boolean;
}

/**
 * Creates a fade-up entrance tween with ScrollTrigger support
 */
export const createFadeUp = (
  target: gsap.DOMTarget,
  options: FadeUpOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    return gsap.set(target, { opacity: 1, y: 0 });
  }

  const {
    y = 30,
    opacity = 0,
    duration = GSAP_DEFAULTS.duration.normal,
    delay = 0,
    ease = GSAP_DEFAULTS.ease.smooth,
    trigger = target,
    start = 'top 85%',
    once = true,
  } = options;

  return gsap.fromTo(
    target,
    { y, opacity },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
          }
        : undefined,
    }
  );
};
