export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

export interface Authority {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  jurisdiction: string;
  status: 'verified' | 'pending-review' | 'archived';
  services: string[]; // references Service IDs
  projectTypes: string[];
  documents: string[];
  process: string[];
  faqs: string[]; // references FAQ IDs
  projects: string[]; // references Project IDs
  guides: string[]; // references Guide IDs
  seo: SEOConfig;
  published: boolean;
  lastReviewed: string;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: 'Design' | 'Approvals' | 'Project Management';
  description: string;
  scope: string[];
  authorityRelations: string[]; // references Authority IDs
  projectTypes: string[];
  documents: string[];
  process: string[];
  faqs: string[];
  projects: string[];
  guides: string[];
  seo: SEOConfig;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  type: string;
  location: string;
  authority: string; // references Authority ID
  year: number;
  scope: string;
  services: string[]; // references Service IDs
  challenge: string;
  solution: string;
  process: string;
  result: string;
  status: 'completed' | 'in-progress';
  photos: { url: string; alt: string; caption?: string }[];
  beforeAfter?: { before: string; after: string };
  documents?: string[];
  certificate?: string;
  testimonial?: string; // references Review ID
  seo: SEOConfig;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  authority?: string;
  service?: string;
  projectType?: string;
  verified: boolean;
  lastReviewed: string;
}
