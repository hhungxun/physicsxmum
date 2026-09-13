import './camp.css';
import CampMotion from '@/components/CampMotion';

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
`;

export default function CampLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: ARM }} />
      <div className="camp-progress" data-progress aria-hidden="true" />
      {children}
      <CampMotion />
    </>
  );
}
