// All copy and data for the quick view lives here so it is easy to update.
// Rule for this file: no em dashes, keep sentences short.
// Anything marked `placeholder: true` is a SOUL3 internal number we still need.

export const sources = {
  gbdStroke: { label: 'GBD 2021 Stroke Collaborators, The Lancet Neurology (2024)', url: 'https://www.downtoearth.org.in/health/global-stroke-rates-climb-india-faces-51-spike-in-cases-over-30-years-lancet' },
  physio: { label: 'World Physiotherapy, India member profile', url: 'https://www.world.physio/membership/india' },
  nmhs: { label: 'National Mental Health Survey of India 2015-16, NIMHANS', url: 'https://www.pubmed.gov/32126902/' },
  who: { label: 'WHO Rehabilitation fact sheet', url: 'https://www.who.int/news-room/fact-sheets/detail/rehabilitation' },
  psd: { label: 'Liu et al., PLoS Medicine (2023), 77 studies', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10047522/' },
  mumbai: { label: 'Mumbai stroke registry, International Journal of Stroke (2009)', url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1747-4949.2009.00313.x' },
};

export type SourceKey = keyof typeof sources;

export const hero = {
  kicker: 'Riidl, Somaiya Vidyavihar University · Mumbai',
  title: ['The long road back,', 'brought closer to home.'],
  body: 'SOUL3 equips physiotherapy centres with the technology, equipment and programmes to bring physiotherapy, neuro-rehabilitation and mental health care into one guided recovery, measured at every step.',
  primary: 'Talk to our team',
  secondary: 'See how we help',
};

export const overview = {
  line: 'Three disciplines.',
  accent: 'One shared record of every recovery.',
  body: 'Most patients are passed between clinics that never speak to each other. We keep the body, the brain and the mind on the same plan.',
};

export const problem = {
  kicker: 'Why this matters',
  title: 'India is saving more lives than ever. Far fewer are being given back.',
  stats: [
    { id: 'strokes', value: '1.25M', label: 'new strokes in India in a single year', note: 'Up from 0.65M in 1990', source: 'gbdStroke' },
    { id: 'living', value: '9.4M', label: 'Indians living with the effects of stroke', note: 'Roughly double the 1990 figure', source: 'gbdStroke' },
    { id: 'physio', value: '0.36', label: 'per 10,000 people', note: 'WHO benchmark is at least 1', source: 'physio' },
    { id: 'gap', value: '84.5%', label: 'of people with a mental illness receive no care', note: 'Fewer than one in six reach treatment', source: 'nmhs' },
    { id: 'psd', value: '1 in 4', label: 'stroke survivors develop depression', note: '27% pooled prevalence', source: 'psd' },
    { id: 'global', value: '2.4B', label: 'people worldwide could benefit from rehab', note: 'Over half go without in many countries', source: 'who' },
  ] as { id: string; value: string; label: string; note: string; source: SourceKey }[],
};

export const modulesIntro = {
  kicker: 'What we do',
  title: 'One system for every part of getting better.',
  body: 'Six parts of the SOUL3 programme, each feeding the same recovery record. Tap + on any card to see what is included.',
};

export const modules = [
  { id: 'physio', chip: "Session 24 of 30 complete", tag: 'Physiotherapy', title: 'Movement, rebuilt and measured.', body: 'Guided sessions for strength, balance and range of motion, with progress tracked week by week instead of guessed.', points: ['Range of motion and strength baselines', 'At partner centres and at home', 'Fall risk and balance scoring'] },
  { id: 'neuro', chip: "Meena reached a new milestone", tag: 'Neuro-rehab', title: 'New paths for the brain.', body: 'After stroke or neurological injury, structured therapy helps the brain relearn speech, grip and walking, one milestone at a time.', points: ['Stroke and brain injury programmes', 'Speech, cognition and fine motor work', 'Milestones the family can see'] },
  { id: 'mind', chip: "Mood up 4 weeks running", tag: 'Mental health', title: 'Care for the weight of it all.', body: 'Fear and frustration slow recovery. Regular check ins and counselling sit inside the plan, not outside it.', points: ['Weekly mood check ins', 'Counselling for patients and carers', 'Early flags for post stroke depression'] },
  { id: 'sensor', chip: "Form corrected remotely", tag: 'Technology', title: 'Sensors that see every repetition.', body: 'Wearable sensors built by our team record each exercise, so therapists can correct form remotely and nothing goes unmeasured.', points: ['Live repetition and angle tracking', 'Left and right symmetry', 'Works at home over Wi-Fi'] },
  { id: 'family', chip: "Anil read today's update", tag: 'Family', title: 'No one walks this road alone.', body: 'Carers stay in the loop with simple updates, so families know what to practise and when to worry.', points: ['Updates on WhatsApp', 'Carer exercise guides', 'One point of contact'] },
  { id: 'report', chip: "Shared with Dr. Rao", tag: 'Reports', title: 'One clear picture each month.', body: 'Physical, neurological and emotional progress in a single report for the patient, the family and the referring doctor.', points: ['Shareable PDF', 'Doctor ready summaries', 'Goals for the month ahead'] },
] as const;

export type ModuleId = typeof modules[number]['id'];

export const steps = [
  { n: '01', title: 'Assessment', body: 'At a SOUL3 partner centre, a combined physical, neurological and emotional baseline in the first visit.' },
  { n: '02', title: 'Personal plan', body: 'One plan across all three disciplines with goals the patient chooses.' },
  { n: '03', title: 'Guided sessions', body: 'At a partner physio centre or at home, using SOUL3 equipment, measured by sensors and reviewed by therapists.' },
  { n: '04', title: 'Review and report', body: 'Monthly reports, adjusted goals, and a clear end point for every phase.' },
];

export const impact = {
  kicker: 'Our progress',
  title: 'Early days, measured honestly.',
  value: '1',
  label: 'partner doctor and mentor on board',
  body: 'Our first clinical partner is also our mentor, guiding SOUL3 from the clinical side and partnered with us in building it. Every new partner is one more step toward 100 physio clinics across Mumbai.',
  note: 'Clinical partner',
  goal: 100,
};

export const vision = {
  kicker: 'Our vision',
  title: ['A world where everyone can', 'become their old selves again.'],
  body: 'We call it seva: service that uplifts a life. It is the idea our name is built on.',
  acronym: [
    { l: 'S', w: 'Seva' },
    { l: 'O', w: 'Of' },
    { l: 'U', w: 'Uplifting' },
    { l: 'L', w: 'Life' },
    { l: '3', w: 'Body, brain, mind' },
  ],
  roadmap: [
    { when: 'Now', where: 'Mumbai', what: 'Pilot from Riidl, Somaiya Vidyavihar University' },
    { when: 'Next', where: 'Across Mumbai', what: 'Partner with 100 physio clinics across Mumbai' },
    { when: 'Later', where: 'Across India', what: 'Technology led rehab within reach of every Indian city' },
  ],
};

// Founders. Add each photo to src/assets/team/ and reference it in FOUNDER_PHOTOS inside Founders.tsx.
export const founders = {
  kicker: 'The founders',
  title: ['Three people,', 'one promise.'],
  body: 'The team building SOUL3 at Riidl, Somaiya Vidyavihar University, so that recovery in India is measured, connected and close to home.',
  people: [
    { id: 'founder1', name: 'Shubham Mehta', role: 'Co-founder & CEO', bio: 'B.Tech in Robotics and AI.', linkedin: '', placeholder: false },
    { id: 'founder2', name: 'Taher Hotelwala', role: 'Co-founder & COO', bio: 'B.Tech in Robotics and AI.', linkedin: '', placeholder: false },
    { id: 'founder3', name: 'Fardin Pirjade', role: 'Co-founder & CTO', bio: 'B.E in Electronics and Telecommunications.', linkedin: '', placeholder: false },
  ],
  // Mentor and first clinical partner. Fill in once confirmed; placeholder styling shows until then.
  mentor: { id: 'mentor', name: 'Dr. Name Surname', title: 'Mentor and clinical partner', specialty: 'Specialty, e.g. Physiotherapist', bio: 'One line on their experience and how they guide SOUL3.', linkedin: '', placeholder: true },
};

export const faqs = [
  { q: 'Who is SOUL3 for?', a: 'Anyone recovering from stroke, neurological illness, injury or surgery, the families caring for them, and the physiotherapy centres that treat them.' },
  { q: 'Is SOUL3 a clinic?', a: 'No. We do not run our own centres. We partner with physiotherapy centres and provide our services, sensors and equipment so their therapists can deliver SOUL3 care.' },
  { q: 'I run a physio centre. Can we partner?', a: 'Yes. We set up our equipment and software at your centre, train your team and support you with the SOUL3 care programme.' },
  { q: 'Do you offer sessions at home?', a: 'Yes. Many sessions can happen at home with SOUL3 sensors, with visits to a partner centre when a therapist needs to be in the room.' },
  { q: 'Do I need a doctor’s referral?', a: 'No. You can contact us directly. If you have one, share it and we will work with your doctor.' },
  { q: 'Is mental health support included?', a: 'Yes. Emotional check ins and counselling are part of every plan, for patients and for carers.' },
  { q: 'Where are you based?', a: 'At Riidl, Somaiya Vidyavihar University in Mumbai. We are starting in Mumbai and growing from there.' },
];

export const contact = {
  email: 'info@soul3.in',
  phone: '+91 98920 46795',
  phoneHref: 'tel:+919892046795',
  address: 'Riidl, Somaiya Vidyavihar University, Vidyavihar, Mumbai',
  whatsapp: 'https://chat.whatsapp.com/Kpssse6vlcb1kSsYQX4bJ6',
};
