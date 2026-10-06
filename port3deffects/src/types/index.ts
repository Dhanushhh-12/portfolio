export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  accentColor?: string;
  caseStudy?: {
    problemStatement: string;
    architecture: string[];
    outcomes: string[];
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  status?: string;
}

export interface DSATopic {
  name: string;
  focus: string;
}

export interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  subtitle: string;
}
