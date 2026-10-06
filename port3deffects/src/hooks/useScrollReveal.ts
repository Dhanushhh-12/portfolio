import { RefObject } from 'react';
import { useGSAP, prefersReducedMotion } from '../animations/gsapConfig';
import { createFadeUp, FadeUpOptions } from '../animations/variants/fadeUp';
import { createStagger, StaggerOptions } from '../animations/variants/stagger';

/**
 * Hook for scroll-triggered single or group reveals
 */
export const useScrollReveal = (
  scopeRef: RefObject<HTMLElement | null>,
  targetSelector: string | string[],
  options: FadeUpOptions = {}
): void => {
  useGSAP(() => {
    if (prefersReducedMotion() || !scopeRef.current) return;

    const targets = Array.isArray(targetSelector)
      ? targetSelector.join(', ')
      : targetSelector;

    const triggerEl = scopeRef.current.querySelector(
      Array.isArray(targetSelector) ? targetSelector[0] : targetSelector
    );

    if (!triggerEl) return;

    createFadeUp(targets, {
      ...options,
      trigger: triggerEl,
    });
  }, { scope: scopeRef });
};

/**
 * Hook for scroll-triggered staggered list/card reveals
 */
export const useScrollStagger = (
  scopeRef: RefObject<HTMLElement | null>,
  triggerSelector: string,
  itemSelector: string,
  options: StaggerOptions = {}
): void => {
  useGSAP(() => {
    if (prefersReducedMotion() || !scopeRef.current) return;

    const triggerEl = scopeRef.current.querySelector(triggerSelector);
    if (!triggerEl) return;

    createStagger(itemSelector, {
      ...options,
      trigger: triggerEl,
    });
  }, { scope: scopeRef });
};

export const useStaggerReveal = useScrollStagger;
