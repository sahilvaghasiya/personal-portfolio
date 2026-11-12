export const profile = {
  name: 'Sahil Vaghasiya',
  tagline:
    'From architecture to deployment — I build AI-first products that actually make it to production.',
  subtagline:
    'Full-stack engineer specializing in AI · Turning complex ideas into scalable, real-world products.',
  availability: 'Available for work',
  about: [
    'I’m an engineer who builds AI-first products end-to-end. Not just the model — the architecture around it, the interface people use, and the infrastructure that keeps it running at scale.',
    'I believe great products start with understanding — the problem, the user, the constraints. Code comes after clarity.',
    'I don’t hand off. I own the full lifecycle — from the first conversation to production, and everything that breaks after.',
  ],
  ctaAction: 'Let’s build it',
  email: 'svaghasiya000@gmail.com',
  workMode: 'Ahmedabad, Gandhinagar, hybrid, or remote',
  engagement: 'Full-time, part-time, and freelance',
  resumeHref: '/Sahil Vaghasiya (Backend & Full‑Stack Developer).pdf',
} as const

export const navItems = [
  { name: 'Story', href: '#about' },
  { name: 'What I Do', href: '#services' },
  { name: 'Work', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Let’s Talk', href: '#contact' },
] as const

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/sahilvaghasiya',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sahil-vaghasiya-7a0028311',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hey.sahil.0',
  },
] as const

export const experiences = [
  {
    period: 'Aug 2023',
    present: true,
    title: 'Software Engineer',
    company: 'APPUNIK',
    href: 'https://appunik.ai',
    tags: ['AI', 'Full-Stack', 'Product'],
    points: [
      'Ship product features from the interface through the API and the release.',
      'The model sits inside the product, next to the interface and the service that releases it.',
    ],
  },
  {
    period: 'Mar 2023 - Jul 2023',
    present: false,
    title: 'Node.js Intern',
    company: 'LINEARLOOP.IO',
    href: 'https://linearloop.io',
    tags: ['Backend'],
    points: [
      'Read a shipping codebase before changing it. Review was how I learned what the system was actually doing.',
      'Fixed bugs in that system and followed each one through review.',
    ],
  },
] as const

export const education = [
  {
    period: '2019 - 2023',
    title: 'B.E. in Computer Engineering',
    school: 'LDRP Institute of Technology and Research',
  },
  {
    period: '2018 - 2019',
    title: 'H.S.C. in Science',
    school: 'Devasya International Public School',
  },
] as const

export const services = [
  {
    title: 'From Ambiguity to Clarity',
    description:
      'I take a vague idea or business problem and turn it into a clear technical plan — system design, data flow, AI feasibility, and a roadmap that actually works.',
  },
  {
    title: 'AI That Actually Ships',
    description:
      'Not playground demos. I build AI features — LLMs, agents, pipelines — integrated into real products with real users. Tested, monitored, production-grade.',
  },
  {
    title: 'Full Product Ownership',
    description:
      'Frontend to backend to infra. I don’t build half a product. I build the whole thing — and I make sure it stays up after launch.',
  },
  {
    title: 'Built to Evolve',
    description:
      'Products don’t end at launch. I build systems designed for feedback loops, iteration, and scaling — so v2 is easier than v1.',
  },
] as const

export type ProjectCategory = 'AI' | 'Full Stack' | 'Backend'

export type Project = {
  title: string
  tagline: string
  brief: string
  problem: string
  role: string
  outcome: string
  technologies: string[]
  category: ProjectCategory
  featured?: boolean
  frame?: 'analysis' | 'campaign'
  liveHref?: string
  codeHref?: string
}

export const projects: Project[] = [
  {
    title: 'AI-Powered Food Analysis and Content Enhancement',
    tagline: 'Turns food content into analysis a product can ship.',
    brief: 'The model answers inside the request the product already makes, and the result is something the product can use.',
    problem: 'The product needed food content analyzed in production, not left as a one-off model demo.',
    role: 'I made analysis a step in the product, not a demo beside it, and built the service that keeps that step reliable.',
    outcome: 'It ships with the rest of the product, running where the product runs.',
    technologies: ['OpenAI', 'Gemini', 'NestJS', 'Firebase', 'Docker', 'Linux'],
    category: 'AI',
    featured: true,
    frame: 'analysis',
  },
  {
    title: 'ThankYou',
    tagline: 'Campaigns, managed in one app.',
    brief: 'Campaigns had no single place to live. The app is that place, from who is allowed in to the data each campaign needs.',
    problem: 'Campaign work needed an application, not a set of disconnected scripts.',
    role: 'I owned the product: the interface people use, who is allowed in, and where the campaign data is kept.',
    outcome: 'A full product for campaigns, from the interface through the data store.',
    technologies: ['Next.js', 'TypeScript', 'Clerk', 'Cloudflare Workers KV'],
    category: 'Full Stack',
    featured: true,
    frame: 'campaign',
  },
  {
    title: 'Meditation App',
    tagline: 'The API behind a meditation product.',
    brief: 'The product needed to know who someone is, what they practiced, and where the audio lives.',
    problem: 'The meditation product needed sign-in, a record of sessions, and storage for media.',
    role: 'I designed that API and owned it through deployment, so the app has one backend to call.',
    outcome: 'The product calls it in production.',
    technologies: ['NestJS', 'GraphQL', 'MySQL', 'Firebase', 'Linux'],
    category: 'Backend',
  },
  {
    title: 'E-Commerce API',
    tagline: 'Catalog and orders on one REST API.',
    brief: 'The store needed one reliable place for the catalog and for orders, instead of each screen inventing its own.',
    problem: 'The store needed a stable way to manage the catalog and take orders.',
    role: 'I drew that boundary and built the service the storefront calls.',
    outcome: 'Catalog and orders stay consistent because they go through one service.',
    technologies: ['Express.js', 'MongoDB', 'REST'],
    category: 'Backend',
    codeHref: 'https://github.com/sahilvaghasiya/REST-APIs-for-E-commerce-websites',
  },
  {
    title: 'Social Media API',
    tagline: 'Sign-in and user management for a social product.',
    brief: 'Nothing else in a social product can ship until a request knows who it belongs to.',
    problem: 'Social features needed accounts and authenticated requests before anything else could ship.',
    role: 'I treated accounts as the foundation and built the service every later feature depends on.',
    outcome: 'Sign-in and user management are a service the product can build on.',
    technologies: ['NestJS', 'MongoDB', 'JWT'],
    category: 'Backend',
  },
]
