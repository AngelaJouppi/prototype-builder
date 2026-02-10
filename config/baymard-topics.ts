export interface BaymardTopic {
  id: string;
  title: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  keyInsight?: string;
  tags?: string[];
  directImpacts?: string[];
  implementationIdeas?: string[];
  url?: string;
}

export const BAYMARD_TOPICS: Record<string, BaymardTopic> = {
  search: {
    id: 'search',
    title: 'Search UX',
    category: 'navigation',
    severity: 'medium',
    description: 'Improve search discoverability and relevance.',
    tags: ['search', 'findability'],
    directImpacts: ['dashboard'],
    implementationIdeas: ['Add better filtering and ranking.'],
    url: '#',
  },
};

interface PrototypeTemplate {
  id: string;
  name: string;
  description: string;
  suggestedTopics: string[];
  exampleFlows: string[];
}

export const PROTOTYPE_TEMPLATES: Record<string, PrototypeTemplate> = {
  starter: {
    id: 'starter',
    name: 'Starter Template',
    description: 'Basic template for prototype setup.',
    suggestedTopics: ['search'],
    exampleFlows: ['flow-a'],
  },
};

export const BAYMARD_SCREENSHOT_GUIDE = {
  steps: ['Capture context', 'Annotate findings', 'Link to flow steps'],
  tips: ['Keep screenshots focused.', 'Use consistent labels.'],
};
