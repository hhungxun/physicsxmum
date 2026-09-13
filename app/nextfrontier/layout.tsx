import './camp.css';
import CampMotion from '@/components/CampMotion';
import { CAMP } from '@/lib/camp';

/**
 * Arms the motion before first paint.
 *
 * `camp-js` is what allows anything to be hidden, so it is deliberately never added
 * when the viewer has asked for reduced motion — that path keeps the plain page.
 *
 * The timer is a failsafe for the case where the motion chunk never arrives: after
 * 2.5s everything is forced visible. CampMotion sets `__campMotion` as soon as it
 * initialises so the failsafe stands down rather than fighting a running timeline.
 */
const ARM = `
(function () {
  var doc = document.documentElement;
  var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq && mq.matches) return;
  doc.classList.add('camp-js');
  setTimeout(function () {
    if (!window.__campMotion) doc.classList.add('camp-reveal-all');
  }, 2500);
})();

// The sticky register bar is handled here, not in CampMotion, so it does not
// depend on GSAP. CampMotion bails entirely under reduced motion, which would
// have denied those visitors the one persistent call to action on the page.
(function () {
  var bar = document.querySelector('[data-sticky-cta]');
  if (!bar) {
    document.addEventListener('DOMContentLoaded', arguments.callee);
    return;
  }
  var shown = false;
  var onScroll = function () {
    var past = window.scrollY > 600;
    if (past !== shown) { shown = past; bar.classList.toggle('is-shown', past); }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
`;

export default function CampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ARM }} />
      <div className="camp-progress" data-progress aria-hidden="true" />
      {children}
      {/* Slides in once the hero is well out of view. */}
      <div className="camp-sticky" data-sticky-cta>
        <span className="camp-sticky__text">Closes {CAMP.registrationClosesShort}</span>
        <a
          href={CAMP.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="camp-sticky__btn"
        >
          Register
        </a>
      </div>
      <CampMotion />
    </>
  );
}
