
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

export interface GenerationState {
  userInput: string;
  isGenerating: boolean;
  currentIteration: number;
  maxIterations: number;
  initialTestCases: TestCases;
  newTestCases: TestCases;
  agents: Agent[];
  showResults: boolean;
}
