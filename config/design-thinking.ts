export type DesignThinkingStage = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test';

export const DESIGN_THINKING_STAGES: Record<DesignThinkingStage, { name: string; description: string }> = {
  empathize: { name: 'Empathize', description: 'Understand users' },
  define: { name: 'Define', description: 'Define the problem' },
  ideate: { name: 'Ideate', description: 'Generate ideas' },
  prototype: { name: 'Prototype', description: 'Build concepts' },
  test: { name: 'Test', description: 'Validate outcomes' },
};

export const DESIGN_THINKING_STAGES_ARRAY = Object.keys(DESIGN_THINKING_STAGES) as DesignThinkingStage[];

export const FIDELITY_LEVELS = {
  low: { name: 'Low' },
  mid: { name: 'Mid' },
  high: { name: 'High' },
} as const;

export const FIDELITY_LEVELS_ARRAY = Object.keys(FIDELITY_LEVELS) as Array<keyof typeof FIDELITY_LEVELS>;
