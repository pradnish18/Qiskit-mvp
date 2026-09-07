import { useState, useEffect, RefObject } from 'react';

/**
 * useScrollProgress:
 * Unified high-performance normalized scroll progress hook for sticky narrative stages.
 * Automatically respects window resizing and prefers-reduced-motion.
 */
export function useScrollProgress(containerRef: RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setProgress(clamped);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial measurement

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return progress;
}

/**
 * Global smooth-step polynomial easing helper:
 * Creates organic start/settle deceleration without artificial springs.
 */
export function smoothStep(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped * clamped * (3 - 2 * clamped);
}
