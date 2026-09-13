'use client';

/**
 * Scroll motion for the camp pages.
 *
 * One controller, driven by data attributes on the server-rendered markup, so the
 * pages stay readable and nothing is wrapped in animation components:
 *
 *   data-anim            fade + rise as it enters (data-anim-delay for stagger)
 *   data-split           heading split into words that rise from behind a mask
 *   data-parallax="0.2"  scrub-linked drift against the scroll
 *   data-counter="60"    counts up on entry (data-counter-prefix / -suffix)
 *   data-progress        fills as the page scrolls
 *
 * The sticky register bar is deliberately NOT handled here — see layout.tsx.
 *
 * Everything is gated behind `.camp-js`, which the inline script in layout.tsx only
 * adds when the viewer has not asked for reduced motion. No JS, reduced motion, or a
 * failed chunk all end at the same place: the plain, fully visible page.
 */

import { useEffect } from 'react';

export default function CampMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    // Tell the layout's failsafe to stand down — from here the animations own
    // visibility, and a blanket "show everything" would fight them mid-flight.
    (window as unknown as Record<string, unknown>).__campMotion = true;

    let destroy = () => {};

    Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')])
      .then(([{ gsap }, { ScrollTrigger }, LenisMod]) => {
        const Lenis = LenisMod.default;
        gsap.registerPlugin(ScrollTrigger);

        /* ---------- smooth scroll ---------- */
        const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
        lenis.on('scroll', ScrollTrigger.update);
        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
          /* ---------- headings: words rise from behind a mask ---------- */
          document.querySelectorAll<HTMLElement>('[data-split]').forEach(el => {
            const text = el.textContent ?? '';
            if (!text.trim()) return;
            el.innerHTML = text
              .trim()
              .split(/\s+/)
              .map(w => `<span class="camp-w"><span class="camp-w__i">${w}</span></span>`)
              .join(' ');

            // The heading is hidden by CSS until here; show it and let the mask do
            // the rest, so only one thing ever writes a transform to a word.
            gsap.set(el, { opacity: 1 });

            gsap.fromTo(
              el.querySelectorAll('.camp-w__i'),
              { yPercent: 115 },
              {
                yPercent: 0,
                duration: 0.85,
                ease: 'expo.out',
                stagger: 0.055,
                scrollTrigger: { trigger: el, start: 'top 88%' },
              },
            );
          });

          /* ---------- blocks: fade and rise ---------- */
          document.querySelectorAll<HTMLElement>('[data-anim]').forEach(el => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 44 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'expo.out',
                delay: Number(el.dataset.animDelay ?? 0) / 1000,
                scrollTrigger: { trigger: el, start: 'top 90%' },
                // Drop the inline transform afterwards. GSAP's leftover
                // translate(0,0) outranks any CSS :hover transform, which would
                // otherwise kill the card lift on every animated element.
                onComplete: () => gsap.set(el, { clearProps: 'transform' }),
              },
            );
          });

          /* ---------- parallax ---------- */
          document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
            const amount = Number(el.dataset.parallax || 0.15);
            gsap.fromTo(
              el,
              { yPercent: -amount * 100 },
              {
                yPercent: amount * 100,
                ease: 'none',
                scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
              },
            );
          });

          /* ---------- counters ---------- */
          document.querySelectorAll<HTMLElement>('[data-counter]').forEach(el => {
            const target = Number(el.dataset.counter || 0);
            const prefix = el.dataset.counterPrefix ?? '';
            const suffix = el.dataset.counterSuffix ?? '';
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%' },
              onUpdate: () => { el.textContent = prefix + Math.round(obj.v) + suffix; },
            });
          });

          /* ---------- FAQ accordion ---------- */
          // <details> snaps open and shut. Take over the summary click so both
          // directions can be animated, and keep `open` in sync for a11y.
          document.querySelectorAll<HTMLDetailsElement>('.camp-faq').forEach(d => {
            const summary = d.querySelector('summary');
            const body = d.querySelector<HTMLElement>('.camp-faq__body');
            if (!summary || !body) return;

            summary.addEventListener('click', e => {
              e.preventDefault();
              if (gsap.isTweening(body)) return;

              if (d.open) {
                gsap.to(body, {
                  height: 0, opacity: 0, duration: 0.28, ease: 'power2.in',
                  onComplete: () => { d.open = false; gsap.set(body, { height: 'auto' }); },
                });
              } else {
                d.open = true;
                gsap.fromTo(body,
                  { height: 0, opacity: 0 },
                  { height: 'auto', opacity: 1, duration: 0.42, ease: 'expo.out' });
              }
            });
          });

          /* ---------- magnetic buttons ---------- */
          document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(btn => {
            const strength = 0.32;
            const move = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect();
              gsap.to(btn, {
                x: (e.clientX - (r.left + r.width / 2)) * strength,
                y: (e.clientY - (r.top + r.height / 2)) * strength,
                duration: 0.4, ease: 'power3.out',
              });
            };
            const reset = () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            btn.addEventListener('pointermove', move);
            btn.addEventListener('pointerleave', reset);
          });

          /* ---------- scroll progress ---------- */
          const bar = document.querySelector<HTMLElement>('[data-progress]');
          if (bar) {
            gsap.to(bar, {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
            });
          }
        });

        ScrollTrigger.refresh();

        destroy = () => {
          ctx.revert();
          gsap.ticker.remove(raf);
          lenis.destroy();
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      })
      .catch(() => {
        // Motion never loaded — make sure nothing stays hidden.
        document.documentElement.classList.add('camp-reveal-all');
      });

    return () => destroy();
  }, []);

  return null;
}
