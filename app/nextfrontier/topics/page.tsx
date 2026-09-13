import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Download, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { absoluteUrl } from '@/lib/site';
import { CAMP } from '@/lib/camp';
import {
  TOPIC_TRACKS, ALL_TOPICS, DIFFICULTY_NOTE, type Difficulty,
} from '@/lib/camp-topics';

const description =
  `All ${ALL_TOPICS.length} poster competition questions for ${CAMP.name} ${CAMP.year}, across quantum physics, ` +
  `artificial intelligence and materials — each with a difficulty label, the physics a good poster must cover, ` +
  `and where to start reading.`;

export const metadata: Metadata = {
  title: `Poster topics — ${CAMP.name}`,
  description,
  alternates: { canonical: '/nextfrontier/topics' },
  openGraph: {
    title: `Poster topics — ${CAMP.name} ${CAMP.year}`,
    description,
    url: absoluteUrl('/nextfrontier/topics'),
  },
};

const CHIP_CLASS: Record<Difficulty, string> = {
  Foundation: 'camp-chip camp-chip--foundation',
  Intermediate: 'camp-chip camp-chip--intermediate',
  Challenging: 'camp-chip camp-chip--challenging',
};

export default function TopicsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="camp flex-1">

        <section style={{ background: 'var(--camp-blue)' }} className="px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/nextfrontier"
              className="camp-label mb-6 inline-flex items-center gap-2"
              style={{ color: 'var(--camp-yellow)' }}
            >
              <ArrowLeft size={14} /> Back to {CAMP.name}
            </Link>
            <h1 className="camp-display text-4xl sm:text-6xl" data-split style={{ color: '#fff' }}>
              Poster topics
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed" data-anim data-anim-delay="150" style={{ color: 'var(--camp-lilac)' }}>
              {ALL_TOPICS.length} questions. None of them has a settled answer. Your poster must show what is
              already known about the physics, and then give your team’s own answer, with your reasoning.
            </p>
          </div>
        </section>

        {/* how to use this page */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="camp-card camp-card--cream px-6 py-6" data-anim>
              <h2 className="camp-display mb-4 text-xl">How to choose</h2>
              <p className="text-sm leading-relaxed">
                Pick three you would genuinely be happy with and give them to us in order when you register.
                Each question is capped at two teams and allocated in order of submission, so your first
                choice is likely but not guaranteed.
              </p>
              <hr className="camp-rule my-5" />
              <h3 className="camp-label mb-3" style={{ color: 'var(--camp-blue)' }}>Difficulty labels</h3>
              <ul className="space-y-2.5 text-sm">
                {(Object.keys(DIFFICULTY_NOTE) as Difficulty[]).map(level => (
                  <li key={level} className="flex flex-wrap items-center gap-2.5">
                    <span className={CHIP_CLASS[level]}>{level}</span>
                    <span>{DIFFICULTY_NOTE[level]}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-bold">
                Difficulty does not affect your score. A Foundation question done brilliantly beats a
                Challenging one done badly.
              </p>
            </div>
          </div>
        </section>

        {/* the topics */}
        {TOPIC_TRACKS.map((track, trackIndex) => (
          <section
            key={track.id}
            id={track.id}
            className="scroll-mt-20 px-4 py-12"
            style={{ background: trackIndex % 2 === 0 ? 'var(--camp-lilac)' : 'transparent' }}
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-8">
                <div className="camp-label mb-2" style={{ color: 'var(--camp-red)' }}>
                  {track.topics.length} topics
                </div>
                <h2 className="camp-display text-3xl" data-split>{track.name}</h2>
                <hr className="camp-rule mt-4" />
              </div>

              <div className="space-y-5">
                {track.topics.map(topic => (
                  <article key={topic.code} id={topic.code} className="camp-card scroll-mt-20 px-6 py-6" data-anim>
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                      <span className="camp-display text-2xl" style={{ color: 'var(--camp-blue)' }}>
                        {topic.code}
                      </span>
                      <span className={CHIP_CLASS[topic.difficulty]}>{topic.difficulty}</span>
                    </div>

                    <h3 className="mb-4 text-lg font-bold leading-snug">{topic.question}</h3>

                    <div className="camp-label mb-2" style={{ color: 'var(--camp-red)' }}>
                      The physics behind it
                    </div>
                    <p className="text-sm leading-relaxed">{topic.anchor}</p>

                    <div className="camp-label mb-2 mt-5" style={{ color: 'var(--camp-red)' }}>
                      Start reading
                    </div>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {topic.links.map(link => (
                        <li key={link.url}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="camp-link inline-flex items-center gap-1 text-sm"
                          >
                            {link.label} <ExternalLink size={12} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* judging — rubric not signed off yet, so nothing is published */}
        <section className="px-4 py-12" style={{ background: 'var(--camp-cream-deep)' }}>
          <div className="mx-auto max-w-4xl">
            <h2 className="camp-display mb-6 text-3xl">How posters are judged</h2>
            <div className="camp-card camp-card--cream px-6 py-8 text-center" data-anim>
              <span className="camp-pill mb-4">Coming soon</span>
              <p className="mx-auto max-w-xl text-sm leading-relaxed">
                Our academic team is finalising the judging rubric. We'll publish the full criteria
                and their weightings here, and send them to every team with your topic starter pack,
                well before the camp — so you'll know exactly what the judges are looking for while
                you're still building your poster.
              </p>
            </div>
          </div>
        </section>

        {/* cta */}
        <section className="px-4 py-14" style={{ background: 'var(--camp-blue)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="camp-display text-3xl" style={{ color: '#fff' }}>Got your three?</h2>
            <p className="mt-4 text-sm" style={{ color: 'var(--camp-lilac)' }}>
              Registration closes {CAMP.registrationCloses}.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={CAMP.formUrl} target="_blank" rel="noopener noreferrer" className="camp-btn camp-btn--primary">
                Register now <ArrowRight size={16} />
              </a>
              <a href="/nextfrontier/poster-topics.pdf" className="camp-btn camp-btn--ghost" download>
                <Download size={16} /> Topic list (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
