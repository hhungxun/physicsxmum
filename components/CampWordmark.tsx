'use client';

/**
 * The NEXT//FRONTIER hero wordmark, interactive on hover.
 *
 *   NEXT      decodes — characters churn through a glyph set and resolve
 *             (GSAP ScrambleTextPlugin, bundled free in the gsap package)
 *   //        spins and flashes
 *   FRONTIER  fills from outline to solid, sweeping left to right
 *
 * The scramble and the fill are split across the two words deliberately: a fill
 * sweep needs a duplicate copy of the text (drawn via ::after and content:
 * attr(data-text)), and keeping that in sync with characters that are actively
 * being rewritten is not worth the complexity.
 *
 * Entry animation and hover animation are kept on SEPARATE elements. They both
 * write transforms, and two sources writing the same property is exactly how the
 * heading reveals got stuck earlier.
 */

import { useEffect, useRef } from 'react';

const NEXT = 'Next';
const FRONTIER = 'Frontier';
const GLYPHS = '01<>/\\[]{}#*+=';

/**
 * Churns each character through GLYPHS, then locks them in left to right.
 *
 * Hand-rolled rather than using GSAP's ScrambleTextPlugin: that plugin is a default
 * export, and a named import silently yields undefined — registerPlugin accepts it
 * without complaint and the tween property is then ignored with no error. Fifteen
 * lines here are easier to trust than a dependency that fails quietly.
 */
function decode(el: HTMLElement, finalText: string, duration: number, onDone: () => void) {
  const chars = [...finalText];
  // Each character locks at a staggered time, with a little jitter so the reveal
  // does not march perfectly in step.
  const lockAt = chars.map((_, i) => (i / chars.length) * duration * 0.68 + Math.random() * duration * 0.22);
  const started = performance.now();

  const frame = (now: number) => {
    const t = now - started;
    let out = '';
    let settled = true;
    chars.forEach((c, i) => {
      if (c === ' ' || t >= lockAt[i]) {
        out += c;
      } else {
        out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        settled = false;
      }
    });
    el.textContent = out;
    if (settled) { el.textContent = finalText; onDone(); return; }
    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
}

export default function CampWordmark() {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let cleanup = () => {};

    import('gsap')
      .then(({ gsap }) => {

        const next = el.querySelector<HTMLElement>('[data-mark-next]');
        const slashes = el.querySelector<HTMLElement>('[data-mark-slashes]');
        const mark = el.querySelector<HTMLElement>('[data-mark]');
        if (!next || !slashes || !mark) return;

        let playing = false;

        const play = () => {
          if (playing) return;
          playing = true;

          decode(next, NEXT, 780, () => { playing = false; });

          gsap.fromTo(
            slashes,
            { rotate: 0, scale: 1 },
            { rotate: 360, scale: 1.18, duration: 0.7, ease: 'expo.out', transformOrigin: '50% 50%' },
          );

          // Short chromatic wobble, then settle.
          gsap.fromTo(
            mark,
            { '--camp-glitch': '0px' },
            {
              '--camp-glitch': '4px',
              duration: 0.09,
              repeat: 3,
              yoyo: true,
              ease: 'steps(1)',
              onComplete: () => gsap.set(mark, { '--camp-glitch': '0px' }),
            },
          );

          el.classList.add('is-lit');
        };

        const stop = () => el.classList.remove('is-lit');

        el.addEventListener('pointerenter', play);
        el.addEventListener('pointerleave', stop);
        el.addEventListener('focusin', play);
        el.addEventListener('focusout', stop);

        // No hover on touch — run it once when it first scrolls into view instead.
        let io: IntersectionObserver | null = null;
        if (window.matchMedia?.('(hover: none)').matches && 'IntersectionObserver' in window) {
          io = new IntersectionObserver(entries => {
            if (entries.some(e => e.isIntersecting)) {
              play();
              setTimeout(stop, 1400);
              io?.disconnect();
            }
          }, { threshold: 0.5 });
          io.observe(el);
        }

        cleanup = () => {
          el.removeEventListener('pointerenter', play);
          el.removeEventListener('pointerleave', stop);
          el.removeEventListener('focusin', play);
          el.removeEventListener('focusout', stop);
          io?.disconnect();
          gsap.killTweensOf([next, slashes, mark]);
        };
      })
      .catch(() => { /* plain wordmark, no hover */ });

    return () => cleanup();
  }, []);

  return (
    <h1 ref={root} className="camp-display camp-mark" tabIndex={0}>
      <span className="block overflow-hidden text-6xl sm:text-8xl">
        <span className="inline-block" data-anim data-anim-delay="80">
          <span data-mark style={{ color: 'var(--camp-orange)' }}>
            <span data-mark-next>{NEXT}</span>
            <span data-mark-slashes className="inline-block" style={{ color: 'var(--camp-red)' }}>
              //
            </span>
          </span>
        </span>
      </span>
      <span className="block overflow-hidden text-6xl sm:text-8xl">
        <span className="inline-block" data-anim data-anim-delay="180">
          <span className="camp-fill" data-text={FRONTIER}>
            <span
              className="camp-outline"
              style={{ WebkitTextStrokeColor: 'var(--camp-ink)' } as React.CSSProperties}
            >
              {FRONTIER}
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}
