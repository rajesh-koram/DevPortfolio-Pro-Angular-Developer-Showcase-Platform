export interface HeroAction {
  label: string;
  fragment: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface HeroHighlight {
  title: string;
  description: string;
}

export interface HeroContent {
  availability: string;
  eyebrow: string;
  name: string;
  title: string;
  tagline: string;
  summary: string;
  primaryAction: HeroAction;
  secondaryAction: HeroAction;
  stats: HeroStat[];
  highlightedSkills: string[];
  highlights: HeroHighlight[];
}

export interface AboutHighlight {
  title: string;
  description: string;
}

export interface AboutContent {
  summary: string;
  strengths: string[];
  highlights: AboutHighlight[];
}

export interface ProjectItem {
  title: string;
  description: string;
  timeline: string;
  techStack: string[];
  achievements: string[];
  liveDemoUrl: string;
  githubUrl: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  items: string[];
}

export interface ContactMethod {
  label: string;
  value: string;
  href: string;
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  details: string;
}

export interface ContactSubmissionItem extends ContactSubmissionPayload {
  _id: string;
  status: 'new' | 'reviewed' | 'archived';
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmissionResponse {
  message: string;
  item: ContactSubmissionItem;
}
