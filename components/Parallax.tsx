'use client';

/**
 * Drifts its children against the scroll while they are on screen.
 *
 * Movement is capped and applied on a rAF tick tied to scroll, and the listener is
 * only attached while the element is actually visible — a scroll handler running
 * for an element three screens away is pure battery cost on a phone.
 */

import { useEffect, useRef, type ReactNode } from 'react';

export default function Parallax({
  children,
  strength = 0.08,
  className = '',
}: {
  children: ReactNode;
  /** Fraction of the element's travel to offset by. Keep it small. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const centreOffset = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = `translate3d(0, ${(-centreOffset * strength).toFixed(2)}px, 0)`;
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !active) {
        active = true;
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else if (!e.isIntersecting && active) {
        active = false;
        window.removeEventListener('scroll', onScroll);
      }
    }, { rootMargin: '25% 0px' });

    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [strength]);

  return <div ref={ref} className={className} style={{ willChange: 'transform' }}>{children}</div>;
}
