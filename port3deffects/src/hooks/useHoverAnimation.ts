import { RefObject, useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion, GSAP_DEFAULTS } from '../animations/gsapConfig';

export interface HoverAnimationOptions {
  scale?: number;
  duration?: number;
  ease?: string;
}

export interface MagneticOptions {
  strength?: number;
  duration?: number;
  ease?: string;
}

/**
 * Hook to apply smooth GSAP hover and tap micro-interactions
 */
export const useHoverAnimation = (
  targetRef: RefObject<HTMLElement | null>,
  options: HoverAnimationOptions = {}
) => {
  const {
    scale = 1.04,
    duration = GSAP_DEFAULTS.duration.micro,
    ease = GSAP_DEFAULTS.ease.snappy,
  } = options;

  useGSAP(() => {
    if (prefersReducedMotion() || !targetRef.current) return;

    const el = targetRef.current;

    const onMouseEnter = () => {
      gsap.to(el, { scale, duration, ease, overwrite: 'auto' });
    };

    const onMouseLeave = () => {
      gsap.to(el, { scale: 1, duration, ease, overwrite: 'auto' });
    };

    const onMouseDown = () => {
      gsap.to(el, { scale: 0.96, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
    };

    const onMouseUp = () => {
      gsap.to(el, { scale, duration: 0.15, ease, overwrite: 'auto' });
    };

    el.addEventListener('mouseenter', onMouseEnter);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseup', onMouseUp);
    };
  }, { scope: targetRef });
};

/**
 * Hook for 60fps magnetic cursor tracking using gsap.quickTo
 */
export const useMagneticAnimation = (
  buttonRef: RefObject<HTMLElement | null>,
  options: MagneticOptions = {}
) => {
  const { strength = 0.3, duration = 0.35, ease = GSAP_DEFAULTS.ease.smooth } = options;
  const xToRef = useRef<((val: number) => void) | null>(null);
  const yToRef = useRef<((val: number) => void) | null>(null);

  useGSAP(() => {
    if (prefersReducedMotion() || !buttonRef.current) return;

    xToRef.current = gsap.quickTo(buttonRef.current, 'x', { duration, ease });
    yToRef.current = gsap.quickTo(buttonRef.current, 'y', { duration, ease });
  }, { scope: buttonRef });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!buttonRef.current || !xToRef.current || !yToRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xToRef.current(deltaX);
    yToRef.current(deltaY);
  };

  const handleMouseLeave = () => {
    if (xToRef.current && yToRef.current) {
      xToRef.current(0);
      yToRef.current(0);
    }
  };

  return { handleMouseMove, handleMouseLeave };
};
