import { NavigationLink } from '../../shared/models/navigation.model';
import {
  AboutContent,
  ContactMethod,
  HeroContent,
  ProjectItem,
  ServiceItem,
  SkillCategory,
} from '../../shared/models/portfolio-content.model';

export const NAVIGATION_LINKS: NavigationLink[] = [
  { label: 'Home', fragment: 'home' },
  { label: 'About', fragment: 'about' },
  { label: 'Projects', fragment: 'projects' },
  { label: 'Services', fragment: 'services' },
  { label: 'Skills', fragment: 'skills' },
  { label: 'Contact', fragment: 'contact' },
];

export const HERO_CONTENT: HeroContent = {
  availability: 'Open to freelance, contract, and senior frontend opportunities',
  eyebrow: 'MEAN Stack Developer · 4.6+ years experience',
  name: 'Rajesh Koram',
  title: 'Building premium Angular experiences that scale.',
  tagline:
    'I design and deliver fast, conversion-focused web applications with Angular, Node.js, and scalable architecture for startups, enterprises, and product teams.',
  summary:
    'Specialized in Angular-first frontend engineering, dashboard ecosystems, API-driven platforms, and performance optimization for business-critical products.',
  primaryAction: {
    label: 'Hire Me',
    fragment: 'contact',
  },
  secondaryAction: {
    label: 'View Projects',
    fragment: 'projects',
  },
  stats: [
    { value: '4.6+', label: 'Years building enterprise web apps' },
    { value: '15+', label: 'Delivered products, modules, and dashboards' },
    { value: '95+', label: 'Lighthouse-ready performance mindset' },
  ],
  highlightedSkills: ['Angular 21', 'TypeScript', 'Node.js', 'Nx-ready architecture', 'REST APIs', 'Performance tuning'],
  highlights: [
    {
      title: 'Scalable Frontend Systems',
      description: 'Reusable UI architecture, standalone Angular patterns, and maintainable codebases prepared for long-term growth.',
    },
    {
      title: 'Product-Focused Delivery',
      description: 'Clean UX, business-aligned features, and polished interfaces that help teams convert users and ship faster.',
    },
    {
      title: 'Backend Integration Ready',
      description: 'Frontend foundations structured for upcoming MEAN stack APIs, auth, dashboards, and content-driven workflows.',
    },
  ],
};

export const ABOUT_CONTENT: AboutContent = {
  summary:
    'Experienced MEAN Stack Developer with 4.6+ years delivering enterprise dashboards, workflow platforms, admin systems, and high-performance Angular frontends for business-critical use cases.',
  strengths: [
    'Angular architecture with standalone components and reusable UI systems',
    'Node.js and REST API integration readiness for scalable product ecosystems',
    'Performance-first implementation with maintainable code and strong DX',
  ],
  highlights: [
    {
      title: 'Enterprise-grade delivery',
      description: 'Built modules and frontends for products that demand clarity, reliability, and long-term maintainability.',
    },
    {
      title: 'Scalable frontend systems',
      description: 'Comfortable designing clean component boundaries, typed services, and future-proof application structure.',
    },
    {
      title: 'Business-aware execution',
      description: 'Balances UX polish, engineering quality, and shipping speed to create recruiter- and client-ready products.',
    },
  ],
};

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    title: 'Enterprise Admin Analytics Suite',
    description:
      'A multi-role Angular dashboard for operations, approvals, analytics, and workflow visibility across distributed teams.',
    timeline: '2025',
    techStack: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'REST APIs'],
    achievements: [
      'Reduced dashboard load complexity with reusable widget architecture.',
      'Improved data visibility through role-based modules and optimized table views.',
      'Prepared UI foundation for secure API and enterprise auth integration.',
    ],
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com/rajesh-koram',
  },
  {
    title: 'Freelance Project Delivery Portal',
    description:
      'A client-facing platform for onboarding, milestone tracking, communication, and delivery transparency.',
    timeline: '2024',
    techStack: ['Angular', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    achievements: [
      'Designed a polished user flow for project status tracking and communication.',
      'Structured components for rapid feature expansion and reusable forms.',
      'Focused on conversion-oriented UI for service businesses and agencies.',
    ],
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com/rajesh-koram',
  },
  {
    title: 'Performance-first SaaS Management UI',
    description:
      'A modern SaaS frontend with modular navigation, rich data screens, and conversion-focused onboarding flows.',
    timeline: '2023',
    techStack: ['Angular', 'Signals', 'Tailwind CSS', 'Charting', 'REST'],
    achievements: [
      'Refined UX with clearer interaction states and responsive layout behavior.',
      'Improved maintainability through modular feature segmentation.',
      'Optimized render-heavy screens for smoother user experience.',
    ],
    liveDemoUrl: 'https://example.com',
    githubUrl: 'https://github.com/rajesh-koram',
  },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    title: 'Angular Frontend Development',
    description: 'Responsive, enterprise-ready Angular applications built with clean architecture and premium UI.',
  },
  {
    title: 'Full Stack Web Apps (MEAN)',
    description: 'Scalable end-to-end product development prepared for APIs, dashboards, and data workflows.',
  },
  {
    title: 'Admin Dashboard Development',
    description: 'Insight-rich internal systems for operations, approvals, analytics, and productivity.',
  },
  {
    title: 'API Development',
    description: 'Frontend-ready API planning and integration patterns for robust MEAN stack delivery.',
  },
  {
    title: 'Performance Optimization',
    description: 'Faster load times, efficient rendering, and maintainable improvements for existing products.',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: '⚡',
    items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'HTML5', 'SCSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: '🧠',
    items: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Authentication', 'API integration'],
  },
  {
    title: 'Tools',
    icon: '🛠️',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma handoff', 'Performance auditing'],
  },
];

export const CONTACT_METHODS: ContactMethod[] = [
  {
    label: 'Email',
    value: 'rajesh2k18.hyd@gmail.com',
    href: 'mailto:rajesh2k18.hyd@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/rajesh-koram',
    href: 'https://www.linkedin.com/in/rajesh-koram',
  },
  {
    label: 'GitHub',
    value: 'github.com/rajesh-koram',
    href: 'https://github.com/rajesh-koram',
  },
];
