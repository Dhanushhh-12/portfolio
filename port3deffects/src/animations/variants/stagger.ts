import { gsap, GSAP_DEFAULTS, prefersReducedMotion } from '../gsapConfig';

export interface StaggerOptions {
  y?: number;
  scale?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  ease?: string;
  trigger?: gsap.DOMTarget;
  start?: string;
  once?: boolean;
}

/**
 * Creates a staggered entrance tween for lists, cards, and grids
 */
export const createStagger = (
  targets: gsap.DOMTarget,
  options: StaggerOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
  }

  const {
    y = 35,
    scale = 0.98,
    opacity = 0,
    duration = GSAP_DEFAULTS.duration.normal,
    stagger = GSAP_DEFAULTS.stagger.normal,
    ease = GSAP_DEFAULTS.ease.snappy,
    trigger,
    start = 'top 85%',
    once = true,
  } = options;

  return gsap.fromTo(
    targets,
    { y, scale, opacity },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration,
      stagger,
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
