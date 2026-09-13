import './camp.css';

/**
 * Sets up the scroll reveals before first paint, without React.
 *
 * Runs inline so the hidden state is applied in the same frame the page paints —
 * arm it any later and the content flashes visible, then snaps away. It also means
 * reveals work from the moment the DOM is parsed rather than waiting on hydration.
 *
 * Three safety valves, in order:
 *   · prefers-reduced-motion  → `camp-js` is never added, so nothing is ever hidden
 *   · no IntersectionObserver → everything is shown immediately
 *   · hydration/JS trouble    → a 2.5s timer shows everything regardless
 */
const REVEALS = `
(function () {
  var doc = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  doc.classList.add('camp-js');
  var showAll = function () { doc.classList.add('camp-reveal-all'); };

  if (!('IntersectionObserver' in window)) { showAll(); return; }

  var start = function () {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          io.unobserve(entries[i].target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    var els = document.querySelectorAll('.camp-reveal');
    for (var i = 0; i < els.length; i++) io.observe(els[i]);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  setTimeout(showAll, 2500);
})();
`;

export default function CampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: REVEALS }} />
      {children}
    </>
  );
}
