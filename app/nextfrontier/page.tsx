import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight, CalendarDays, MapPin, Users, Wallet, Download, Mail,
  Instagram, Clock, CheckCircle2, FileText,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Reveal from '@/components/Reveal';
import Parallax from '@/components/Parallax';
import Footer from '@/components/Footer';
import { absoluteUrl } from '@/lib/site';
import { CAMP, INCLUSIONS, ACTIVITIES, OUTCOMES, SCHEDULE, FAQS } from '@/lib/camp';

const description =
  `A two-day residential science camp at Xiamen University Malaysia for students aged ${CAMP.ageRange}. ` +
  `${CAMP.datesLong}. Quantum, AI and materials — talks, campus games, stargazing and a poster competition. ` +
  `${CAMP.fee}, accommodation and meals included.`;

export const metadata: Metadata = {
  title: `${CAMP.name} — ${CAMP.fullName}`,
  description,
  alternates: { canonical: '/nextfrontier' },
  openGraph: {
    title: `${CAMP.name} — ${CAMP.fullName}`,
    description,
    url: absoluteUrl('/nextfrontier'),
    images: [{ url: absoluteUrl('/images/nextfrontier/poster.jpeg'), alt: `${CAMP.name} ${CAMP.year} poster` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [absoluteUrl('/images/nextfrontier/poster.jpeg')],
  },
};

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <Reveal className="camp-label mb-3" style={{ color: 'var(--camp-red)' }}>{eyebrow}</Reveal>
      <Reveal as="h2" delay={90} className="camp-display text-3xl sm:text-4xl">{title}</Reveal>
    </div>
  );
}

export default function NextFrontierPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="camp flex-1">

        {/* ---------------- hero ---------------- */}
        <section style={{ background: 'var(--camp-blue)' }} className="px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="camp-window">
              <div className="camp-window__bar">
                <span className="camp-window__address">physicsxmum.my/nextfrontier</span>
                <span className="camp-window__dots" aria-hidden="true">
                  <span className="camp-window__dot" />
                  <span className="camp-window__dot" />
                  <span className="camp-window__dot" />
                </span>
              </div>

              <div className="px-5 py-10 text-center sm:px-10 sm:py-14">
                <Reveal direction="scale">
                  <span className="camp-pill mb-6" style={{ background: 'var(--camp-red)', color: '#fff' }}>
                    Age {CAMP.ageRange}? You’re up next.
                  </span>
                </Reveal>

                <Reveal as="h1" delay={120} className="camp-display">
                  <span className="block text-6xl sm:text-8xl" style={{ color: 'var(--camp-orange)' }}>
                    Next<span style={{ color: 'var(--camp-red)' }}>//</span>
                  </span>
                  <span
                    className="camp-outline block text-6xl sm:text-8xl"
                    style={{ WebkitTextStrokeColor: 'var(--camp-ink)' } as React.CSSProperties}
                  >
                    Frontier
                  </span>
                </Reveal>

                <Reveal as="p" delay={220} className="camp-label mt-5 text-sm" style={{ letterSpacing: '0.22em' }}>
                  Quantum · AI &amp; Materials
                </Reveal>
                <Reveal as="p" delay={300} className="mx-auto mt-4 max-w-xl text-base leading-relaxed">
                  A two-day science camp on a university campus. Real labs, real lecturers, and a poster
                  competition where your team defends its own science.
                </Reveal>

                <Reveal delay={380} className="mt-8 flex flex-wrap justify-center gap-3">
                  <a href={CAMP.formUrl} target="_blank" rel="noopener noreferrer" className="camp-btn camp-btn--primary">
                    Register now <ArrowRight size={16} />
                  </a>
                  <a href="#programme" className="camp-btn camp-btn--ghost">See the programme</a>
                </Reveal>
                <Reveal as="p" delay={460} className="mt-4 text-sm font-semibold">Registration closes {CAMP.registrationCloses}</Reveal>
              </div>
            </div>

            {/* fact strip */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: CalendarDays, label: 'When', value: CAMP.dates },
                { icon: MapPin, label: 'Where', value: 'XMUM, Sepang' },
                { icon: Wallet, label: 'Fee', value: `${CAMP.fee} all in` },
                { icon: Users, label: 'Who', value: `Ages ${CAMP.ageRange} · ${CAMP.places} places` },
              ].map(({ icon: Icon, label, value }, i) => (
                <Reveal key={label} delay={i * 80} className="camp-card camp-card--cream flex items-center gap-3 px-4 py-3">
                  <Icon size={20} style={{ color: 'var(--camp-red)' }} />
                  <div>
                    <div className="camp-label" style={{ color: 'var(--camp-blue)' }}>{label}</div>
                    <div className="text-sm font-bold">{value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- what you get ---------------- */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Why come" title="What you’ll take home" />
            <p className="mb-8 max-w-2xl text-base leading-relaxed">
              This camp exists to show you what physics looks like after school — not as a syllabus, but as
              a subject people actually work in. Over two days you will:
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {OUTCOMES.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 70} className="camp-card flex gap-3 px-5 py-4">
                  <CheckCircle2 size={20} className="mt-0.5 flex-none" style={{ color: 'var(--camp-red)' }} />
                  <span className="text-sm leading-relaxed">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- activities ---------------- */}
        <section className="px-4 py-16" style={{ background: 'var(--camp-lilac)' }}>
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="What happens" title="Four things you’ll do" />
            <div className="grid gap-5 sm:grid-cols-2">
              {ACTIVITIES.map((activity, i) => (
                <Reveal as="article" key={activity.title} delay={i * 90} className="camp-card px-6 py-6">
                  <div
                    className="camp-display mb-2 text-4xl"
                    style={{ color: 'var(--camp-lilac-deep)' }}
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="camp-display mb-3 text-xl">{activity.title}</h3>
                  <p className="text-sm leading-relaxed">{activity.blurb}</p>
                </Reveal>
              ))}
            </div>

            <div className="camp-card camp-card--cream mt-6 px-6 py-5">
              <p className="text-sm leading-relaxed">
                <strong>Two different groupings, so don’t mix them up.</strong> You register and compete in a
                team of {CAMP.teamSize} — that’s who you build and present the poster with. On the day you’ll
                also be put into a bigger group for the campus station games, mixed with other teams.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------- programme ---------------- */}
        <section id="programme" className="scroll-mt-20 px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="The plan" title="Indicative programme" />
            <div className="camp-card camp-card--cream mb-8 flex flex-wrap gap-x-10 gap-y-4 px-6 py-5">
              <div>
                <div className="camp-label" style={{ color: 'var(--camp-blue)' }}>Arrive</div>
                <div className="mt-1 flex items-center gap-2 text-sm font-bold">
                  <Clock size={15} style={{ color: 'var(--camp-red)' }} /> {CAMP.arrival}
                </div>
              </div>
              <div>
                <div className="camp-label" style={{ color: 'var(--camp-blue)' }}>Ends</div>
                <div className="mt-1 flex items-center gap-2 text-sm font-bold">
                  <Clock size={15} style={{ color: 'var(--camp-red)' }} /> {CAMP.departure}
                </div>
                <div className="mt-1 text-xs">Please arrange collection by {CAMP.collectBy}.</div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SCHEDULE.map((day, i) => (
                <Reveal key={day.day} delay={i * 120} direction={i === 0 ? 'left' : 'right'} className="camp-card px-6 py-6">
                  <div className="camp-label mb-1" style={{ color: 'var(--camp-red)' }}>{day.day}</div>
                  <h3 className="camp-display mb-4 text-xl">{day.date}</h3>
                  <hr className="camp-rule mb-4" />
                  <ul className="space-y-2.5">
                    {day.items.map(item => (
                      <li key={item.time + item.event} className="flex gap-4 text-sm">
                        <span className="camp-time w-14 flex-none">{item.time}</span>
                        <span>{item.event}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed" style={{ color: '#4a5568' }}>
              Times are indicative and rooms are confirmed in your joining pack, which we send in November.
              The shape of the two days won’t change.
            </p>
          </div>
        </section>

        {/* ---------------- fee ---------------- */}
        <section className="px-4 py-16" style={{ background: 'var(--camp-blue)' }}>
          <div className="mx-auto max-w-5xl">
            <Reveal direction="scale" className="camp-tape px-6 py-10 sm:px-10">
              <div className="text-center">
                <div className="camp-label mb-2" style={{ color: 'var(--camp-blue)' }}>Everything included</div>
                <div className="camp-display text-6xl" style={{ color: 'var(--camp-red)' }}>{CAMP.fee}</div>
                <p className="mt-2 text-sm font-semibold">per participant</p>
              </div>
              <hr className="camp-rule my-8" />
              <ul className="mx-auto grid max-w-2xl gap-3 sm:grid-cols-2">
                {INCLUSIONS.map(item => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                    <CheckCircle2 size={18} className="mt-0.5 flex-none" style={{ color: 'var(--camp-red)' }} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-relaxed">
                There is nothing further to pay during the camp. You pay the {CAMP.fee} as part of
                registering — the last page of the form has the bank details and asks you to upload
                your receipt.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- poster competition ---------------- */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="The competition" title="Pick a question. Defend your answer." />
            <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <Reveal direction="left" className="camp-card camp-card--cream px-6 py-6">
                <p className="text-sm leading-relaxed">
                  There are 24 questions across quantum physics, artificial intelligence and materials, and{' '}
                  <strong>none of them has a settled answer.</strong> Your poster has to show what is already
                  known about the physics — and then give your team’s own answer, with your reasoning.
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  You give us three choices when you register. Each question is capped at two teams, so we
                  allocate in order of submission and confirm your topic by email, with a starter pack, within
                  two weeks of registration closing.
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  Every question carries a difficulty label and the physics a good poster needs to engage
                  with. <strong>Difficulty doesn’t affect your score</strong> — a Foundation question done
                  brilliantly beats a Challenging one done badly.
                </p>
                <Link href="/nextfrontier/topics" className="camp-btn camp-btn--secondary mt-6">
                  See all 24 topics <ArrowRight size={16} />
                </Link>
              </Reveal>

              <Reveal direction="right" delay={120} className="camp-card camp-card--lilac px-6 py-6">
                <h3 className="camp-display mb-4 text-lg">How you’re judged</h3>
                <span className="camp-pill mb-4">Rubric coming soon</span>
                <p className="text-sm leading-relaxed">
                  Our academic team is finalising the judging criteria. We’ll publish them on the
                  topics page and send them to every team with your starter pack, well before the
                  camp.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- register ---------------- */}
        <section id="register" className="scroll-mt-20 px-4 py-16" style={{ background: 'var(--camp-lilac)' }}>
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Sign up" title="How to register" />
            <div className="grid gap-6 md:grid-cols-2">
              <Reveal direction="left" className="camp-card px-6 py-6">
                <h3 className="camp-display mb-4 text-lg">Four steps</h3>
                <ol className="space-y-4 text-sm leading-relaxed">
                  <li><strong>1.</strong> Form a team of {CAMP.teamSize} and agree your team name. All three of
                    you must type it <strong>exactly</strong> the same way — capitals and numbers, no spaces.</li>
                  <li><strong>2.</strong> Download the parental acknowledgement below and get it signed.</li>
                  <li><strong>3.</strong> Each of you fills in the registration form separately. It takes about
                    eight minutes.</li>
                  <li><strong>4.</strong> Pay the {CAMP.fee} by bank transfer on the last page of the form and
                    upload your receipt. We'll confirm your place by email once we've checked it.</li>
                </ol>
              </Reveal>

              <Reveal direction="right" delay={120} className="camp-card camp-card--cream px-6 py-6">
                <h3 className="camp-display mb-4 text-lg">Have these ready</h3>
                <ul className="space-y-2.5 text-sm leading-relaxed">
                  <li>· A Google account — the form asks you to upload files</li>
                  <li>· Your signed parental acknowledgement, scanned or photographed</li>
                  <li>· Your IC or passport number</li>
                  <li>· A parent or guardian’s phone number</li>
                  <li>· Your two teammates’ names and email addresses</li>
                  <li>· Your three topic choices, agreed with your team</li>
                  <li>· <strong>{CAMP.fee} to transfer, and your receipt to upload</strong></li>
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <a href={CAMP.formUrl} target="_blank" rel="noopener noreferrer" className="camp-btn camp-btn--primary">
                    Open the registration form <ArrowRight size={16} />
                  </a>
                  <a href="/nextfrontier/parental-acknowledgement-form.pdf" className="camp-btn camp-btn--ghost" download>
                    <Download size={16} /> Parental form (PDF)
                  </a>
                  <a href="/nextfrontier/poster-topics.pdf" className="camp-btn camp-btn--ghost" download>
                    <FileText size={16} /> Topic list (PDF)
                  </a>
                </div>
                <p className="mt-4 text-center text-xs font-semibold">
                  Closes {CAMP.registrationCloses}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- poster image ---------------- */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Spread the word" title="The poster" />
            <Reveal direction="scale">
              <Parallax strength={0.05} className="camp-card overflow-hidden p-3">
                <Image
                src="/images/nextfrontier/poster.jpeg"
                alt={`${CAMP.name} ${CAMP.year} camp poster: ${CAMP.dates}, ages ${CAMP.ageRange}, ${CAMP.fee}, accommodation and meals included`}
                width={1587}
                height={2245}
                  className="h-auto w-full rounded"
                />
              </Parallax>
            </Reveal>
            <p className="mt-4 text-center text-sm">
              Printing this for your school noticeboard? Please do.
            </p>
          </div>
        </section>

        {/* ---------------- faq ---------------- */}
        <section className="px-4 py-16" style={{ background: 'var(--camp-cream-deep)' }}>
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow="Questions" title="Before you ask" />
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <Reveal as="details" key={faq.q} delay={Math.min(i, 6) * 50} className="camp-card px-5 py-4">
                  <summary className="cursor-pointer text-sm font-bold">{faq.q}</summary>
                  <p className="mt-3 text-sm leading-relaxed">{faq.a}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- contact ---------------- */}
        <section className="px-4 py-16" style={{ background: 'var(--camp-blue)' }}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="camp-display text-3xl" style={{ color: '#fff' }}>Still not sure?</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--camp-lilac)' }}>
              Ask us anything — whether your school can send a group, whether you can come without a full
              team, or what the weekend is really like.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${CAMP.email}`} className="camp-btn camp-btn--secondary">
                <Mail size={16} /> {CAMP.email}
              </a>
              <a href={CAMP.instagramUrl} target="_blank" rel="noopener noreferrer" className="camp-btn camp-btn--ghost">
                <Instagram size={16} /> @{CAMP.instagram}
              </a>
            </div>
            <p className="mt-8 text-xs" style={{ color: 'var(--camp-lilac-deep)' }}>
              Organised by the {CAMP.organiser} · Advisor: {CAMP.advisor} · Ref: {CAMP.reference}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
