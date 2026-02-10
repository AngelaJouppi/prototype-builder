// Design Thinking Methodology Integration
// Based on Stanford d.school framework

export type DesignThinkingStage = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test';

export interface DesignThinkingStageInfo {
  id: DesignThinkingStage;
  name: string;
  description: string;
  icon: string;
  color: string;
  activities: string[];
  deliverables: string[];
}

export const DESIGN_THINKING_STAGES: Record<DesignThinkingStage, DesignThinkingStageInfo> = {
  empathize: {
    id: 'empathize',
    name: 'Empathize',
    description: 'Understand users through research and observation',
    icon: 'Users',
    color: '#3B82F6', // Blue
    activities: [
      'User interviews',
      'Contextual inquiry',
      'Surveys and questionnaires',
      'Shadowing and observation',
      'Stakeholder interviews'
    ],
    deliverables: [
      'Interview transcripts',
      'User research notes',
      'Empathy maps',
      'User personas',
      'Journey maps'
    ]
  },
  
  define: {
    id: 'define',
    name: 'Define',
    description: 'Synthesize research into actionable problem statements',
    icon: 'Target',
    color: '#8B5CF6', // Purple
    activities: [
      'Affinity mapping',
      'Problem statement creation',
      'Point of view (POV) development',
      'How Might We questions',
      'Prioritization exercises'
    ],
    deliverables: [
      'Problem statements',
      'POV statements',
      'HMW questions',
      'User needs hierarchy',
      'Opportunity areas'
    ]
  },
  
  ideate: {
    id: 'ideate',
    name: 'Ideate',
    description: 'Generate creative solutions and explore possibilities',
    icon: 'Lightbulb',
    color: '#F59E0B', // Amber
    activities: [
      'Brainstorming sessions',
      'Crazy 8s sketching',
      'SCAMPER technique',
      'Mind mapping',
      'Competitive analysis'
    ],
    deliverables: [
      'Concept sketches',
      'Feature lists',
      'User flow diagrams',
      'Information architecture',
      'Solution proposals'
    ]
  },
  
  prototype: {
    id: 'prototype',
    name: 'Prototype',
    description: 'Build tangible representations to test ideas',
    icon: 'Layout',
    color: '#10B981', // Green
    activities: [
      'Low-fidelity wireframing',
      'Interactive prototyping',
      'High-fidelity mockups',
      'Design system application',
      'Usability flow creation'
    ],
    deliverables: [
      'Wireframes',
      'Interactive prototypes',
      'Design specifications',
      'Component libraries',
      'Demo flows'
    ]
  },
  
  test: {
    id: 'test',
    name: 'Test',
    description: 'Validate solutions with real users and iterate',
    icon: 'FlaskConical',
    color: '#EF4444', // Red
    activities: [
      'Usability testing',
      'A/B testing',
      'Heuristic evaluation',
      'Accessibility audits',
      'Analytics review'
    ],
    deliverables: [
      'Test scripts',
      'Findings reports',
      'Iteration plans',
      'Success metrics',
      'Final recommendations'
    ]
  }
};

// Export as array for easier mapping
export const DESIGN_THINKING_STAGES_ARRAY = Object.values(DESIGN_THINKING_STAGES);

export interface ProjectDesignThinkingData {
  currentStage: DesignThinkingStage;
  empathize?: {
    userResearchNotes?: string;
    personas?: string[];
    painPoints?: string[];
  };
  define?: {
    problemStatement?: string;
    hmwQuestions?: string[];
    userNeeds?: string[];
  };
  ideate?: {
    concepts?: string[];
    selectedConcept?: string;
    rationale?: string;
  };
  prototype?: {
    fidelityLevel?: 'wireframe' | 'standard' | 'polished';
    flows?: string[];
  };
  test?: {
    testingNotes?: string;
    findings?: string[];
    nextSteps?: string[];
  };
}

export const FIDELITY_LEVELS = {
  wireframe: {
    id: 'wireframe' as const,
    name: 'Low-Fidelity Wireframes',
    description: 'Quick, sketch-like interfaces for rapid iteration',
    features: [
      'Grayscale only',
      'Basic shapes and placeholders',
      'Focus on layout and flow',
      'Fast iteration',
      'No detailed styling'
    ],
    useWhen: [
      'Early ideation',
      'Testing multiple concepts',
      'Stakeholder alignment on structure',
      'Before investing in visual design'
    ]
  },
  standard: {
    id: 'standard' as const,
    name: 'Standard Prototypes',
    description: 'Interactive prototypes with CUPABU design system',
    features: [
      'Full color using design system',
      'Interactive components',
      'Real content and copy',
      'CUPABU styling applied',
      'Responsive layouts'
    ],
    useWhen: [
      'User testing',
      'Developer handoff',
      'Stakeholder demos',
      'Most projects (default)'
    ]
  },
  polished: {
    id: 'polished' as const,
    name: 'Polished Compositions',
    description: 'High-fidelity, production-ready designs',
    features: [
      'Full design system',
      'Micro-interactions',
      'Real images and data',
      'Accessibility compliant',
      'Production-ready specs'
    ],
    useWhen: [
      'Executive presentations',
      'Final design sign-off',
      'Marketing materials',
      'Developer implementation'
    ]
  }
};

// Export as array for easier mapping
export const FIDELITY_LEVELS_ARRAY = Object.values(FIDELITY_LEVELS);
