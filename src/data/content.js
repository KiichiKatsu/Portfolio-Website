// ---------------------------------------------------------------------------
// Placeholder content. Swap the copy, links, images, and tags here as things
// firm up — components read straight from these exports.
// ---------------------------------------------------------------------------

export const profile = {
  name: 'Kiichiro Tatsuzawa',
  role: 'PhD Researcher — Human–Computer Interaction',
  affiliation: 'The University of Queensland',
  summary:
    'I study how the sense of touch can be designed for. My work looks at subperceptual haptic interventions, multi-digit haptic interaction, and the hardware needed to deliver both — building custom interfaces, sensor arrays, and prototyping rigs along the way.',
  location: 'Brisbane, Australia',
  links: {
    linkedin: 'https://www.linkedin.com/in/kiichiro-tatsuzawa/',
    orcid: 'https://orcid.org/0000-0000-0000-0000',
    email: 'kiichiro.tatsuzawa@gmail.com',
  },
}

// Small banner under the hero — swap in a quote you resonate with.
export const quote = {
  text: 'You\'re in the the circus bro, going \'Doesn\'t anyone see we\'re surrounded by clowns?\'. Brother, give your nose a squeeze and tell me what you hear.',
  attribution: '— Ryan Letourneau, From that one Horsey game stream',
}

export const research = [
  {
    title: 'Subperceptual haptic interventions for sustained attention',
    venue: 'CHI 2027',
    status: 'In preparation',
    authors: 'K. Tatsuzawa, et al.',
    summary:
      'Investigating whether haptic cues delivered below the threshold of conscious perception can nudge attention without adding cognitive load.',
  },
  {
    title: 'Multi-digit haptic interaction on handheld surfaces',
    venue: 'CHI 2027',
    status: 'In preparation',
    authors: 'K. Tatsuzawa, et al.',
    summary:
      'Characterising how independent tactile feedback across multiple fingers changes grip, gesture, and perceived control on a handheld device.',
  },
  {
    title: 'A testbed for per-digit actuation and sensing',
    venue: 'Working paper',
    status: 'Draft',
    authors: 'K. Tatsuzawa',
    summary:
      'A modular linkage-and-sensor platform for delivering and recording per-finger haptic signals in controlled studies.',
  },
]

// Every carousel item shares the shape: { title, subtitle?, blurb, tags[] }

export const hardware = [
  {
    title: 'The Fractal Dial',
    subtitle: 'Multi-digit Haptic Interaction',
    blurb:
      'A rotary control that renders an independent detent profile to each finger, so one dial can carry several simultaneous haptic "channels".',
    tags: ['hardware', 'research'],
  },
  {
    title: 'Sub-perceptual Haptic Controllers',
    subtitle: 'Below-threshold actuation',
    blurb:
      'Handheld controllers with voice-coil actuators tuned to deliver cues just beneath conscious perception for attention and guidance studies.',
    tags: ['hardware', 'research'],
  },
  {
    title: 'Custom Arduino & MPU6050 Arrays',
    subtitle: 'Sensing & actuation rigs',
    blurb:
      'Multiplexed IMU arrays and real-time control loops on RP2040 / ATmega boards, logging finger and hand motion at high sample rates.',
    tags: ['hardware', 'sensing'],
  },
  {
    title: '3D-printed Linkage Mechanisms',
    subtitle: 'Rapid iteration',
    blurb:
      'FDM and resin prints for four-bar linkages, jigs, and wearable mounts — sketched, printed, and fitted in the same afternoon.',
    tags: ['prototype'],
  },
  {
    title: 'Wearable Actuation Mounts',
    subtitle: 'On-body prototyping',
    blurb:
      'Low-profile finger and palm mounts that hold actuators steady against the skin without restricting natural movement.',
    tags: ['prototype', 'wearable'],
  },
]

export const designPortfolio = [
  {
    title: 'Eurohaptics Submission',
    subtitle: 'Demo paper & stand',
    blurb:
      'A demo paper and interactive stand exploring per-digit feedback, from concept sketches through to the final poster and booth design.',
    tags: ['research', 'project'],
  },
  {
    title: 'Haptic Interaction Toolkit',
    subtitle: 'Design system',
    blurb:
      'A small component library and design language for describing tactile patterns consistently across studies and prototypes.',
    tags: ['design', 'project'],
  },
  {
    title: 'Student Design Competition',
    subtitle: 'Concept to prototype',
    blurb:
      'Concept-to-prototype entry reframing notifications as ambient, sub-perceptual touch rather than sound or light.',
    tags: ['design', 'event'],
  },
  {
    title: 'Lab Visual System',
    subtitle: 'Identity & templates',
    blurb:
      'Identity, slide templates, and a documentation site giving the research group a coherent look across talks and publications.',
    tags: ['design'],
  },
]

export const experience = [
  {
    title: 'Research Assistant — HCI Lab',
    subtitle: '2024 — present',
    blurb:
      'Designing and running haptics user studies, building the apparatus, and handling analysis and write-up for submission.',
    tags: ['research'],
  },
  {
    title: 'Teaching Assistant — Interaction Design',
    subtitle: '2023 — 2024',
    blurb:
      'Running studio sessions and critiques for undergraduate interaction design, from wireframes to working prototypes.',
    tags: ['event'],
  },
  {
    title: 'Hardware Prototyping Intern',
    subtitle: 'Summer 2023',
    blurb:
      'Turned rough briefs into functional bench prototypes — enclosure design, microcontroller firmware, and quick-turn 3D printing.',
    tags: ['project'],
  },
  {
    title: 'Workshop Facilitator',
    subtitle: '2022 — 2023',
    blurb:
      'Led hands-on sessions introducing students to microcontrollers, sensors, and the basics of physical prototyping.',
    tags: ['event'],
  },
]

export const awards = [
  {
    year: '2025',
    title: 'Research Training Program Scholarship',
    detail: 'The University of Queensland',
  },
  {
    year: '2024',
    title: 'Best Poster (Honourable Mention)',
    detail: 'Placeholder venue — update with the real award',
  },
  {
    year: '2023',
    title: "Dean's Commendation for Academic Excellence",
    detail: 'Placeholder — update with the real award',
  },
]
