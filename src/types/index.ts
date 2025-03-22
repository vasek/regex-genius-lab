
export interface Agent {
  id: number;
  status: 'pending' | 'evaluating' | 'completed';
  regex?: string;
  score?: number;
}

export interface TestCases {
  passing: string[];
  failing: string[];
}

export interface Iteration {
  number: number;
  testCases: TestCases;
  agents: Agent[];
}

export interface GenerationState {
  userInput: string;
  isGenerating: boolean;
  currentIteration: number;
  maxIterations: number;
  iterations: Iteration[];
  showResults: boolean;
}
