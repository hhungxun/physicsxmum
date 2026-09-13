/**
 * Poster competition topic bank — NEXT//FRONTIER 2026.
 *
 * The 24 questions are the committee's canonical list (Poster-Presentation-Topics.pdf).
 * Each carries two things that list does not:
 *
 *   difficulty — so teams self-select honestly. It does not affect scoring.
 *   anchor     — the physics a poster on this question has to engage with,
 *                so "scientific accuracy" is something judges can actually mark.
 *
 * Draft for Academic Team review. The anchor text is also the front half of
 * each topic's starter pack: write once, publish twice.
 */

export type Difficulty = 'Foundation' | 'Intermediate' | 'Challenging';

export interface CampTopic {
  code: string;
  question: string;
  difficulty: Difficulty;
  anchor: string;
  links: { label: string; url: string }[];
}

export interface TopicTrack {
  id: string;
  name: string;
  topics: CampTopic[];
}

export const DIFFICULTY_NOTE = {
  Foundation: 'No physics beyond Form 4 needed.',
  Intermediate: 'Comfortable with Form 5 physics, and willing to read past the first search result.',
  Challenging: 'For teams who want to stretch. Expect ideas that are in no syllabus.',
} as const;

export const TOPIC_TRACKS: TopicTrack[] = [
  {
    id: 'materials',
    name: 'Materials',
    topics: [
      {
        code: 'M1',
        question: 'Could we ever build a material that conducts electricity perfectly at room temperature?',
        difficulty: 'Challenging',
        anchor:
          'Superconductivity is a phase change, not just very low resistance: below a critical temperature electrons pair up and current flows with no dissipation, and the material expels magnetic field entirely — the Meissner effect. Your answer needs the current temperature record, why the best candidates demand either extreme cold or extreme pressure, and an honest account of why several room-temperature claims have been retracted.',
        links: [
          { label: 'Superconductivity', url: 'https://en.wikipedia.org/wiki/Superconductivity' },
          { label: 'Meissner effect', url: 'https://en.wikipedia.org/wiki/Meissner_effect' },
          { label: 'Nobel Prize in Physics 1987', url: 'https://www.nobelprize.org/prizes/physics/1987/summary/' },
        ],
      },
      {
        code: 'M2',
        question: 'When silicon finally runs out of room, what should replace it?',
        difficulty: 'Intermediate',
        anchor:
          'Transistors shrink until quantum tunnelling leaks current straight through the gate and heat density becomes unmanageable. Explain what sets that floor, then compare the candidate successors — III–V semiconductors, two-dimensional materials, carbon nanotubes — on the properties that actually decide it: carrier mobility, band gap, and whether anyone can manufacture them by the billion.',
        links: [
          { label: "Moore's law", url: 'https://en.wikipedia.org/wiki/Moore%27s_law' },
          { label: 'Quantum tunnelling', url: 'https://en.wikipedia.org/wiki/Quantum_tunnelling' },
          { label: 'Semiconductor device fabrication', url: 'https://en.wikipedia.org/wiki/Semiconductor_device_fabrication' },
        ],
      },
      {
        code: 'M3',
        question: 'Could a sheet of carbon one atom thick change how we build everything?',
        difficulty: 'Foundation',
        anchor:
          'Start from the structure — a hexagonal lattice of sp² carbon — and derive the properties from it: tensile strength, carrier mobility, thermal conductivity. Then do the harder half honestly. Twenty years after the Nobel Prize, graphene has replaced almost nothing. A good poster explains why "the strongest material ever measured" and "not useful for building bridges" are both true at once.',
        links: [
          { label: 'Graphene', url: 'https://en.wikipedia.org/wiki/Graphene' },
          { label: 'Nobel Prize in Physics 2010', url: 'https://www.nobelprize.org/prizes/physics/2010/summary/' },
        ],
      },
      {
        code: 'M4',
        question: 'Is there a limit to how much of the Sun’s energy we can ever capture?',
        difficulty: 'Challenging',
        anchor:
          'Yes, and it is a specific number. The Shockley–Queisser limit caps a single-junction solar cell at about 33.7%, because photons below the band gap pass straight through and photons above it waste their excess energy as heat. Show where that figure comes from, then explain how multi-junction cells and concentrators get past it — and what they cost.',
        links: [
          { label: 'Shockley–Queisser limit', url: 'https://en.wikipedia.org/wiki/Shockley%E2%80%93Queisser_limit' },
          { label: 'Solar cell efficiency', url: 'https://en.wikipedia.org/wiki/Solar_cell_efficiency' },
          { label: 'Multi-junction solar cell', url: 'https://en.wikipedia.org/wiki/Multi-junction_solar_cell' },
        ],
      },
      {
        code: 'M5',
        question: 'Could a battery ever hold as much energy as a tank of petrol?',
        difficulty: 'Foundation',
        anchor:
          'Compare specific energy with real numbers: petrol is around 12 kWh/kg, a lithium-ion pack around 0.15–0.25 kWh/kg — a factor of roughly fifty. Then make the fair correction, because a petrol engine throws away about three-quarters of that as heat while an electric motor wastes very little, so the useful gap is nearer tenfold. Finish with what limits lithium-ion chemically, and what solid-state cells promise.',
        links: [
          { label: 'Energy density', url: 'https://en.wikipedia.org/wiki/Energy_density' },
          { label: 'Lithium-ion battery', url: 'https://en.wikipedia.org/wiki/Lithium-ion_battery' },
          { label: 'Solid-state battery', url: 'https://en.wikipedia.org/wiki/Solid-state_battery' },
        ],
      },
      {
        code: 'M6',
        question: 'Should we build computers out of light instead of electricity?',
        difficulty: 'Challenging',
        anchor:
          'Photons carry no charge, barely interact with each other, and dissipate no resistive heat in a wire — which makes light superb for moving data and awkward for switching it, because switching needs exactly the interaction light refuses to provide. Explain why optical interconnects already run inside data centres while an all-optical logic gate remains hard, and what a photonic chip genuinely does today.',
        links: [
          { label: 'Optical computing', url: 'https://en.wikipedia.org/wiki/Optical_computing' },
          { label: 'Photonic integrated circuit', url: 'https://en.wikipedia.org/wiki/Photonic_integrated_circuit' },
        ],
      },
      {
        code: 'M7',
        question: 'Could an object ever be made truly invisible?',
        difficulty: 'Intermediate',
        anchor:
          'Invisibility means guiding light around an object and restoring its wavefront on the far side, leaving no scattering and no shadow. Metamaterials do this with sub-wavelength structure rather than chemistry, producing a negative refractive index. Explain why demonstrations work at microwave frequencies in one narrow band, and why broadband visible-light cloaking runs straight into dispersion.',
        links: [
          { label: 'Metamaterial', url: 'https://en.wikipedia.org/wiki/Metamaterial' },
          { label: 'Negative-index metamaterial', url: 'https://en.wikipedia.org/wiki/Negative-index_metamaterial' },
          { label: 'Metamaterial cloaking', url: 'https://en.wikipedia.org/wiki/Metamaterial_cloaking' },
        ],
      },
      {
        code: 'M8',
        question: 'Could a material be designed to heal itself, the way living tissue does?',
        difficulty: 'Foundation',
        anchor:
          'There are two mechanisms and a good poster separates them: intrinsic healing, where reversible bonds re-form across a crack, and extrinsic healing, where embedded microcapsules rupture and release a curing agent. Be precise about what healing means physically — restoring load-bearing continuity — and honest about how many cycles these survive and what fraction of the original strength comes back.',
        links: [
          { label: 'Self-healing material', url: 'https://en.wikipedia.org/wiki/Self-healing_material' },
          { label: 'Self-healing polymers', url: 'https://en.wikipedia.org/wiki/Self-healing_polymers' },
        ],
      },
      {
        code: 'M9',
        question: 'Could we ever build a cable strong enough to reach into space?',
        difficulty: 'Challenging',
        anchor:
          'A space elevator needs a tether whose specific strength — strength divided by density — lets it carry its own weight over roughly 36,000 km. Work out the figure that requires, then set it against the best measured carbon-nanotube samples and, separately, against what can be manufactured in bulk. The gap between a laboratory fibre and a cable is the whole story.',
        links: [
          { label: 'Space elevator', url: 'https://en.wikipedia.org/wiki/Space_elevator' },
          { label: 'Specific strength', url: 'https://en.wikipedia.org/wiki/Specific_strength' },
          { label: 'Carbon nanotube', url: 'https://en.wikipedia.org/wiki/Carbon_nanotube' },
        ],
      },
      {
        code: 'M10',
        question: 'Could a city run on the heat we currently throw away?',
        difficulty: 'Intermediate',
        anchor:
          'Thermoelectric materials turn a temperature difference directly into voltage through the Seebeck effect, with performance governed by the figure of merit ZT. Explain the central difficulty: a good thermoelectric must conduct electricity well and heat badly, and in most materials those two properties travel together. Then estimate how much waste heat is actually available at a useful temperature.',
        links: [
          { label: 'Thermoelectric effect', url: 'https://en.wikipedia.org/wiki/Thermoelectric_effect' },
          { label: 'Thermoelectric materials', url: 'https://en.wikipedia.org/wiki/Thermoelectric_materials' },
          { label: 'Waste heat', url: 'https://en.wikipedia.org/wiki/Waste_heat' },
        ],
      },
    ],
  },
  {
    id: 'quantum',
    name: 'Quantum',
    topics: [
      {
        code: 'Q1',
        question: 'Classical physics worked so well — so why did it have to be replaced?',
        difficulty: 'Intermediate',
        anchor:
          'Three experiments broke it, and not narrowly. Black-body radiation: classical theory predicts infinite energy at short wavelengths. The photoelectric effect: brightness should set the electrons’ energy, but frequency does instead. Atomic spectra: classical orbits should radiate continuously and collapse within nanoseconds. Put each prediction next to each measurement and let the size of the failure do the arguing.',
        links: [
          { label: 'Ultraviolet catastrophe', url: 'https://en.wikipedia.org/wiki/Ultraviolet_catastrophe' },
          { label: 'Photoelectric effect', url: 'https://en.wikipedia.org/wiki/Photoelectric_effect' },
          { label: 'Bohr model', url: 'https://en.wikipedia.org/wiki/Bohr_model' },
        ],
      },
      {
        code: 'Q2',
        question: 'Does an electron decide what it is only at the moment we look at it?',
        difficulty: 'Challenging',
        anchor:
          'Ground this in the double-slit experiment: interference appears when both paths stay open, and vanishes the moment path information exists anywhere. Be exact that "looking" means interacting — no conscious observer is required, and saying otherwise is the single most common error on this topic. Then state honestly that physicists still disagree about what the disappearance means.',
        links: [
          { label: 'Double-slit experiment', url: 'https://en.wikipedia.org/wiki/Double-slit_experiment' },
          { label: 'Quantum superposition', url: 'https://en.wikipedia.org/wiki/Quantum_superposition' },
          { label: 'Measurement problem', url: 'https://en.wikipedia.org/wiki/Measurement_problem' },
        ],
      },
      {
        code: 'Q3',
        question: 'Is the uncertainty principle a limit on our instruments, or on reality itself?',
        difficulty: 'Intermediate',
        anchor:
          'On reality. Δx·Δp ≥ ℏ/2 follows from a particle being a wave packet: localise it tightly in space and you must add more wavelengths to build it, which necessarily spreads its momentum. The marks here are for killing the misconception — the story about a clumsy photon knocking the electron is not what Heisenberg proved. Explain where that misreading came from and why it survives.',
        links: [
          { label: 'Uncertainty principle', url: 'https://en.wikipedia.org/wiki/Uncertainty_principle' },
          { label: 'Wave packet', url: 'https://en.wikipedia.org/wiki/Wave_packet' },
        ],
      },
      {
        code: 'Q4',
        question: 'Could a particle pass through a wall that you could not?',
        difficulty: 'Foundation',
        anchor:
          'The wavefunction decays exponentially inside a barrier rather than stopping dead at it, so a thin enough barrier leaves a small but real amplitude on the far side. Show how the probability depends on barrier width, height and particle mass — which is exactly why you do not tunnel through doors. Then the payoff: fusion in the Sun, scanning tunnelling microscopes, and flash memory.',
        links: [
          { label: 'Quantum tunnelling', url: 'https://en.wikipedia.org/wiki/Quantum_tunnelling' },
          { label: 'Scanning tunneling microscope', url: 'https://en.wikipedia.org/wiki/Scanning_tunneling_microscope' },
        ],
      },
      {
        code: 'Q5',
        question: 'Is randomness built into the universe, or do we simply not know enough yet?',
        difficulty: 'Challenging',
        anchor:
          'This question has an experimental answer, which is what makes it worth a poster. Bell turned it into a measurable inequality, and experiments violate that inequality — ruling out local hidden variables. Explain what a Bell test actually measures, what the 2022 Nobel Prize was awarded for, and precisely which assumption about reality the results force you to abandon.',
        links: [
          { label: "Bell's theorem", url: 'https://en.wikipedia.org/wiki/Bell%27s_theorem' },
          { label: 'Bell test', url: 'https://en.wikipedia.org/wiki/Bell_test' },
          { label: 'Nobel Prize in Physics 2022', url: 'https://www.nobelprize.org/prizes/physics/2022/summary/' },
        ],
      },
      {
        code: 'Q6',
        question: 'Could a quantum computer solve a problem that no ordinary computer ever could?',
        difficulty: 'Challenging',
        anchor:
          'Be careful with "ever". A quantum computer computes nothing a classical one cannot, given unlimited time — the claim is about how the cost scales, not about what is computable. Explain superposition and entanglement as resources, why Shor’s algorithm turns factoring from exponential into polynomial, and why decoherence and error correction keep the machines small.',
        links: [
          { label: 'Quantum computing', url: 'https://en.wikipedia.org/wiki/Quantum_computing' },
          { label: "Shor's algorithm", url: 'https://en.wikipedia.org/wiki/Shor%27s_algorithm' },
          { label: 'Quantum error correction', url: 'https://en.wikipedia.org/wiki/Quantum_error_correction' },
        ],
      },
      {
        code: 'Q7',
        question: 'Can a message ever be sent in a way that is impossible to intercept?',
        difficulty: 'Intermediate',
        anchor:
          'Quantum key distribution rests on physics rather than on a hard sum. Measuring an unknown quantum state disturbs it, and the no-cloning theorem forbids copying it, so an eavesdropper shows up as errors in the key. Walk through BB84 concretely — then be honest about the gap between a secure protocol and a secure product: real attacks target the hardware, not the theorem.',
        links: [
          { label: 'Quantum key distribution', url: 'https://en.wikipedia.org/wiki/Quantum_key_distribution' },
          { label: 'BB84', url: 'https://en.wikipedia.org/wiki/BB84' },
          { label: 'No-cloning theorem', url: 'https://en.wikipedia.org/wiki/No-cloning_theorem' },
        ],
      },
      {
        code: 'Q8',
        question: 'Are quantum effects at work inside living things?',
        difficulty: 'Challenging',
        anchor:
          'Every chemical bond is already quantum, so the real question is sharper: does biology exploit coherence or tunnelling in ways classical physics cannot account for? Examine the strongest candidates — the radical-pair model for how birds sense magnetic fields, proton tunnelling in enzyme catalysis — and weigh the evidence critically. This topic attracts a great deal of pseudoscience; stay with peer-reviewed sources and say so on your poster.',
        links: [
          { label: 'Quantum biology', url: 'https://en.wikipedia.org/wiki/Quantum_biology' },
          { label: 'Magnetoreception', url: 'https://en.wikipedia.org/wiki/Magnetoreception' },
        ],
      },
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence & Computation',
    topics: [
      {
        code: 'A1',
        question: 'Could a machine ever be conscious, and how would we know?',
        difficulty: 'Challenging',
        anchor:
          'Keep this physical or it collapses into opinion. Computation has a thermodynamic cost: Landauer’s principle sets a minimum energy to erase a single bit, and a brain and a chip sit very differently against that floor. Compare what each physically does with energy and information. Then examine one testable proposal — integrated information theory claims consciousness is a measurable quantity — and why many physicists dispute it.',
        links: [
          { label: "Landauer's principle", url: 'https://en.wikipedia.org/wiki/Landauer%27s_principle' },
          { label: 'Integrated information theory', url: 'https://en.wikipedia.org/wiki/Integrated_information_theory' },
        ],
      },
      {
        code: 'A2',
        question: 'Could an AI discover a law of physics that humans have missed?',
        difficulty: 'Intermediate',
        anchor:
          'Separate fitting data from finding a law. Symbolic regression systems have recovered known laws from raw measurements — explain how that works, and exactly what "recovered" means when the answer was already in the textbook. Then ask what a law needs beyond predictive accuracy: compactness, invariance, and the ability to hold outside the data it was trained on.',
        links: [
          { label: 'Symbolic regression', url: 'https://en.wikipedia.org/wiki/Symbolic_regression' },
          { label: 'Scientific law', url: 'https://en.wikipedia.org/wiki/Scientific_law' },
        ],
      },
      {
        code: 'A3',
        question: 'Will we ever be able to predict the weather a month in advance?',
        difficulty: 'Foundation',
        anchor:
          'Almost certainly not, and there is a physical reason rather than an engineering one. Lorenz showed the atmosphere is chaotic: differences too small to measure grow exponentially, so forecast skill collapses after roughly two weeks however good the model and however fast the computer. Explain the mechanism, then why machine-learned models still improved forecasts dramatically inside that horizon.',
        links: [
          { label: 'Chaos theory', url: 'https://en.wikipedia.org/wiki/Chaos_theory' },
          { label: 'Lorenz system', url: 'https://en.wikipedia.org/wiki/Lorenz_system' },
          { label: 'Numerical weather prediction', url: 'https://en.wikipedia.org/wiki/Numerical_weather_prediction' },
        ],
      },
      {
        code: 'A4',
        question: 'Should we trust a scientific result that no human can explain?',
        difficulty: 'Intermediate',
        anchor:
          'Make this concrete through verification. AlphaFold predicts protein structures nobody can derive by hand — so how is it checked? Cover held-out test sets, the blind CASP assessment, and experimental confirmation by crystallography. Then argue the real question: whether "we validated it thoroughly" is the same kind of trust as "we understand why it works", and where that distinction matters.',
        links: [
          { label: 'AlphaFold', url: 'https://en.wikipedia.org/wiki/AlphaFold' },
          { label: 'CASP', url: 'https://en.wikipedia.org/wiki/CASP' },
          { label: 'Explainable artificial intelligence', url: 'https://en.wikipedia.org/wiki/Explainable_artificial_intelligence' },
        ],
      },
      {
        code: 'A5',
        question: 'Could a computer invent a material that no human would have thought of?',
        difficulty: 'Intermediate',
        anchor:
          'This is search plus screening. Explain how models predict whether a hypothetical compound would be stable, using formation energy and the convex hull, and how open databases make the search possible at scale. Then the unglamorous half, which is where the marks are: most predicted compounds have never been made, and predicting that something is stable is not the same as knowing how to synthesise it.',
        links: [
          { label: 'Materials Project', url: 'https://en.wikipedia.org/wiki/Materials_Project' },
          { label: 'Density functional theory', url: 'https://en.wikipedia.org/wiki/Density_functional_theory' },
          { label: 'Materials informatics', url: 'https://en.wikipedia.org/wiki/Materials_informatics' },
        ],
      },
      {
        code: 'A6',
        question: 'Is there a physical limit to how much a machine can think?',
        difficulty: 'Challenging',
        anchor:
          'There are several, at different distances. Landauer’s principle sets a thermodynamic floor on the energy needed to erase a bit; getting the resulting heat out of the chip sets a much tighter practical limit long before you reach it. Explain why irreversible computation must dissipate energy, how far real processors sit above the Landauer floor, and what reversible computing claims to offer.',
        links: [
          { label: "Landauer's principle", url: 'https://en.wikipedia.org/wiki/Landauer%27s_principle' },
          { label: 'Reversible computing', url: 'https://en.wikipedia.org/wiki/Reversible_computing' },
          { label: "Bremermann's limit", url: 'https://en.wikipedia.org/wiki/Bremermann%27s_limit' },
        ],
      },
    ],
  },
];

export const ALL_TOPICS: CampTopic[] = TOPIC_TRACKS.flatMap(track => track.topics);

/**
 * DRAFT — deliberately not rendered anywhere yet.
 *
 * The Academic Team has not signed these weightings off, and publishing a rubric
 * commits the camp to marking against it. Both camp pages show a "coming soon"
 * placeholder instead. Once it is approved, render this from the topics page and
 * drop the placeholder.
 */
export const JUDGING_CRITERIA = [
  { criterion: 'Scientific accuracy', weight: '30%', detail: 'Correct physics. No hand-waving, and no misconceptions carried over from the internet.' },
  { criterion: 'Clarity of communication', weight: '25%', detail: 'Could another 16-year-old follow this without help?' },
  { criterion: 'Visual design', weight: '20%', detail: 'Readable and uncluttered, with figures that carry meaning rather than decorate.' },
  { criterion: 'Depth of understanding', weight: '15%', detail: 'Judged in the Q&A. Every judge will ask you one question that is not on your poster.' },
  { criterion: 'Originality of angle', weight: '10%', detail: 'Did you find your own way in, or reproduce the first search result?' },
] as const;
