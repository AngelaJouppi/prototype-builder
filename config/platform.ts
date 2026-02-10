import type { Page } from '../App';

export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  keyInsight?: string;
  tags: string[];
  usedIn: Array<{ id: string; name: string }>;
  url?: string;
}

export interface Flow {
  id: string;
  name: string;
  description: string;
  startPage: Page;
  startDesignId?: string;
  startJobId?: string;
  devNotes?: string;
  researchIds?: string[];
}

export interface Deliverable {
  id: string;
  name: string;
  flows: Flow[];
}

export interface Project {
  id: string;
  name: string;
  status: string;
  description: string;
  taskLink?: { platform?: string; url?: string };
  deliverables: Deliverable[];
  researchItems?: ResearchItem[];
}

const DEFAULT_PROJECT: Project = {
  id: 'pmor-44',
  name: 'Team Builder Dashboard & Reorder UX',
  status: 'in-progress',
  description: 'Prototype project for dashboard and reorder improvements.',
  taskLink: { platform: 'Jira', url: '#' },
  deliverables: [
    {
      id: 'deliverable-1',
      name: 'Interactive Prototype',
      flows: [
        { id: 'flow-a', name: 'Design-to-order', description: 'Design details to checkout.', startPage: 'easyview-enhanced', startDesignId: 'DES-1001', startJobId: 'JOB-100' },
        { id: 'flow-b', name: 'Job-to-order', description: 'Job details ordering flow.', startPage: 'job-details', startJobId: 'JOB-100' },
      ],
    },
  ],
  researchItems: [
    {
      id: 'research-1',
      title: 'Prioritize clear reorder context',
      description: 'Users need confidence before reordering team-builder assets.',
      keyInsight: 'Context + confidence increase reorder conversion.',
      tags: ['reorder', 'confidence'],
      usedIn: [{ id: 'flow-a', name: 'Design-to-order' }],
      url: '#',
    },
  ],
};

const KEY = 'prototype-projects';

function loadProjects(): Record<string, Project> {
  if (typeof window === 'undefined') return { [DEFAULT_PROJECT.id]: DEFAULT_PROJECT };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { [DEFAULT_PROJECT.id]: DEFAULT_PROJECT };
    const parsed = JSON.parse(raw) as Record<string, Project>;
    return { [DEFAULT_PROJECT.id]: DEFAULT_PROJECT, ...parsed };
  } catch {
    return { [DEFAULT_PROJECT.id]: DEFAULT_PROJECT };
  }
}

function persistProjects(projects: Record<string, Project>) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(projects));
}

const getState = () => loadProjects();

export const PROJECT_STORAGE = {
  getAllProjects: () => getState(),
  getProject: (projectId: string) => getState()[projectId] ?? null,
  saveProject: (project: Project) => {
    const all = getState();
    all[project.id] = project;
    persistProjects(all);
  },
};

export const PLATFORM_CONFIG = {
  appName: 'Prototype Builder',
  version: '1.0.0',
};
