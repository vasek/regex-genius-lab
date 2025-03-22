export interface Agent {
  id: string;
  status: "pending" | "evaluating" | "completed";
  regex?: string;
  score?: number;
  failures?: string[];
}

export interface TestCases {
  valid: string[];
  invalid: string[];
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
