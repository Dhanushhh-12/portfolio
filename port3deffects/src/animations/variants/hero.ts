import { gsap, GSAP_DEFAULTS, prefersReducedMotion } from '../gsapConfig';

export interface HeroTimelineOptions {
  delay?: number;
}

/**
 * Creates an entrance timeline for Hero elements (badge, headline, subtitle, buttons, terminal)
 */
export const createHeroTimeline = (
  _scope?: HTMLElement | null,
  options: HeroTimelineOptions = {}
): gsap.core.Timeline => {
  const tl = gsap.timeline({
    defaults: { ease: GSAP_DEFAULTS.ease.smooth },
    delay: options.delay ?? 0.15,
  });

  if (prefersReducedMotion()) {
    tl.set(
      ['.hero-badge', '.hero-headline', '.hero-description', '.hero-cta-item', '.hero-meta', '.hero-terminal-card'],
      { opacity: 1, y: 0, scale: 1 }
    );
    return tl;
  }

  tl.fromTo(
    '.hero-badge',
    { y: 18, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6 }
  )
    .fromTo(
      '.hero-headline',
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      '.hero-description',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.5'
    )
    .fromTo(
      '.hero-cta-item',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      '-=0.4'
    )
    .fromTo(
      '.hero-meta',
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 },
      '-=0.3'
    )
    .fromTo(
      '.hero-terminal-card',
      { y: 30, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: GSAP_DEFAULTS.ease.snappy },
      '-=0.7'
    );

  return tl;
};
