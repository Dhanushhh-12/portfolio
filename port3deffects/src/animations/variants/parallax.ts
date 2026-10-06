import { gsap, prefersReducedMotion } from '../gsapConfig';

export interface ParallaxOptions {
  speed?: number; // Distance in pixels to translate relative to scroll
  direction?: 'y' | 'x';
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Attaches a scrubbed parallax motion tween to a target element
 */
export const createParallax = (
  target: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  options: ParallaxOptions = {}
): gsap.core.Tween | null => {
  if (prefersReducedMotion()) {
    return null;
  }

  const {
    speed = 40,
    direction = 'y',
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
  } = options;

  const prop = direction === 'y' ? 'y' : 'x';

  return gsap.fromTo(
    target,
    { [prop]: -speed },
    {
      [prop]: speed,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start,
        end,
        scrub,
      },
    }
  );
};
