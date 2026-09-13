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
 *   data-htrack          section pins and its inner track scrolls sideways
 *   data-progress        fills as the page scrolls
 *
 * Everything is gated behind `.camp-js`, which the inline script in layout.tsx only
 * adds when the viewer has not asked for reduced motion. No JS, reduced motion, or a
 * failed chunk all end at the same place: the plain, fully visible page.
 */

import { useEffect } from 'react';

const DESKTOP = 900;

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

          /* ---------- pinned horizontal track ---------- */
          if (window.innerWidth >= DESKTOP) {
            document.querySelectorAll<HTMLElement>('[data-htrack]').forEach(section => {
              const track = section.querySelector<HTMLElement>('[data-htrack-inner]');
              if (!track) return;
              const distance = () => track.scrollWidth - window.innerWidth + 80;
              if (distance() <= 0) return;

              gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top top',
                  end: () => '+=' + distance(),
                  pin: true,
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                  anticipatePin: 1,
                },
              });
            });
          }

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
