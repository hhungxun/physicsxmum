/**
 * Junior Science Camp 2026 — NEXT//FRONTIER
 *
 * Single source of truth for every fact published on /nextfrontier.
 * Anything shown on the camp pages should be read from here, so the
 * landing page and the topics page can never drift apart.
 *
 * Facts confirmed by the organising committee, September 2026.
 */

export const CAMP = {
  name: 'NEXT//FRONTIER',
  year: 2026,
  fullName: 'Junior Science Camp 2026',
  theme: 'Quantum, AI & Materials',
  tagline: 'The physics of the next decade.',

  dates: '5–6 December 2026',
  datesLong: 'Saturday 5 – Sunday 6 December 2026',
  arrival: '09:00, Saturday 5 December',
  departure: 'approximately 13:00, Sunday 6 December',
  collectBy: '13:30',

  venue: 'Xiamen University Malaysia, Sepang, Selangor',
  accommodation: 'One night of on-campus accommodation at Uni Hotel',

  fee: 'RM170',
  places: 60,
  ageRange: '16–17',
  eligibility: 'Pre-university and foundation students aged 16–17',

  teamSize: 3,
  registrationCloses: 'Sunday 8 November 2026',
  registrationClosesShort: '8 Nov 2026',
  headcountDeadline: '23 November 2026',

  formUrl: 'https://forms.gle/4brcswfae7emJ6Jv6',
  email: 'phy2409023@xmu.edu.my',
  instagram: 'xmum_physc',
  instagramUrl: 'https://www.instagram.com/xmum_physc',

  organiser: 'XMUM Physics Student Council',
  advisor: 'Dr Chung Fei Fang',
  reference: 'UF-PHY-26-001',
} as const;

/** What the fee covers. Mirrors the printed poster's promise. */
export const INCLUSIONS = [
  'One night of on-campus accommodation at Uni Hotel',
  'Four meals — Saturday lunch, Saturday dinner, Sunday breakfast, Sunday lunch',
  'All activity materials and campus access',
  'Certificate of participation',
] as const;

/**
 * The four headline activities, mirroring the printed poster exactly.
 * Do not add or remove entries without reissuing the poster.
 */
export const ACTIVITIES = [
  {
    title: 'Poster competition',
    blurb:
      'Your team of three picks a question from our topic list, researches it before camp, and defends it in person to XMUM physicists.',
  },
  {
    title: 'Campus station games',
    blurb:
      'Physics challenges at stations across the university, run as you tour the campus — the track, the labs, the café rooftop, the poolside.',
  },
  {
    title: 'Talks by XMUM lecturers',
    blurb:
      'The research that does not fit in a textbook, from the people doing it.',
  },
  {
    title: 'Stargazing',
    blurb:
      'Hand-build a telescope in the evening, then take it out onto the field and use it under a dark campus sky.',
  },
] as const;

/** What a participant should leave with. */
export const OUTCOMES = [
  'See what a physics degree actually involves, from the people teaching it',
  'Get inside a working university physics laboratory',
  'Tour a university campus and spend a night living on one',
  'Work through physics problems as games, with a team',
  'Research a real open question and present it to physicists',
] as const;

/**
 * Indicative block programme.
 *
 * Deliberately carries no room numbers and no Day 2 breakdown: venues are
 * confirmed in the joining pack, and the Day 2 structure is still with the
 * committee. Times come from the committee run-sheet.
 */
export const SCHEDULE = [
  {
    day: 'Day 1',
    date: 'Saturday 5 December',
    items: [
      { time: '09:00', event: 'Arrival and check-in' },
      { time: '10:00', event: 'Opening and team splitting' },
      { time: '10:30', event: 'Ice breaking' },
      { time: '12:00', event: 'Lunch' },
      { time: '13:00', event: 'Talk by an XMUM lecturer' },
      { time: '14:30', event: 'Campus station games' },
      { time: '18:30', event: 'Dinner' },
      { time: '19:30', event: 'Telescope building' },
      { time: '21:00', event: 'Stargazing' },
      { time: '22:30', event: 'Free time, then lights out' },
    ],
  },
  {
    day: 'Day 2',
    date: 'Sunday 6 December',
    items: [
      { time: '07:30', event: 'Wake-up and breakfast' },
      { time: '09:00', event: 'Morning programme' },
      { time: '12:00', event: 'Lunch' },
      { time: '13:00', event: 'Closing — camp ends' },
    ],
  },
] as const;

export const FAQS = [
  {
    q: 'Who can come?',
    a: `Students aged ${CAMP.ageRange}, in pre-university or foundation programmes. There are ${CAMP.places} places.`,
  },
  {
    q: 'Do I need a team to register?',
    a: `Yes. We only accept complete teams of ${CAMP.teamSize} — all three of you must register, each filling in the form separately, and you must all type the same team name exactly. Agree it before you start. Don't have a team? Email us and we'll try to pair you up with others looking for teammates.`,
  },
  {
    q: 'Is the team of three the same as my group on the day?',
    a: 'No. Your team of three is who you research and present the poster with. On the day you are also placed in a larger group for the campus station games, mixed with other teams.',
  },
  {
    q: 'What does the fee cover?',
    a: `${CAMP.fee} covers your accommodation, four meals, all activity materials and a certificate. There is nothing else to pay during the camp.`,
  },
  {
    q: 'When do I pay?',
    a: `You pay when you register. The last page of the form has the bank transfer details, and you upload your payment receipt as part of the form — so have the ${CAMP.fee} ready before you start. Your place is confirmed once we've checked your payment.`,
  },
  {
    q: 'Do my parents have to sign anything?',
    a: 'Yes. You are staying overnight on campus, so we need a parental acknowledgement signed by a parent or guardian. Download it below, have it signed, and upload it with your registration.',
  },
  {
    q: 'When do I find out my poster topic?',
    a: 'Topics are capped at two teams each and allocated in order of submission, which is why we ask for three choices. We confirm your allocated topic by email within two weeks of registration closing, together with a starter pack for it.',
  },
  {
    q: 'What if I need to withdraw?',
    a: `Tell us before ${CAMP.headcountDeadline} and we will refund you in full. After that date we have already paid for your accommodation and meals, so we cannot refund — but you may pass your place to another student of the same gender. If we cancel the camp, everyone is refunded in full.`,
  },
  {
    q: 'I have a dietary requirement or a medical condition.',
    a: 'The registration form asks about dietary requirements, allergies, medical conditions and emergency contacts. Please answer honestly — it goes to our first-aid team and nowhere else.',
  },
] as const;
