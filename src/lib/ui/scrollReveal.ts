/**
 * Lightweight IntersectionObserver for scroll-triggered reveal animations.
 * Adds `.is-visible` to elements with `.reveal` when they enter the viewport.
 * Respects prefers-reduced-motion — elements are made visible immediately when
 * reduced motion is preferred (CSS handles the instant transition).
 *
 * Usage:
 *   import { initScrollReveal } from '@/lib/ui/scrollReveal';
 *   initScrollReveal();
 *
 * Or with a custom selector and stagger delay:
 *   initScrollReveal('.my-cards', 0.05);
 */
export function initScrollReveal(selector = '.reveal', staggerDelay = 0): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = document.querySelectorAll<HTMLElement>(selector);

  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el, i) => {
    if (staggerDelay > 0) {
      el.style.transitionDelay = `${i * staggerDelay}s`;
    }
    observer.observe(el);
  });
}
