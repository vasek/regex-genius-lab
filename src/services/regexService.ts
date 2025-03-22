
import { Agent, TestCases, GenerationState } from '../types';

// This is a mock service that simulates the backend API
// In a real application, this would make actual API calls

const initialState: GenerationState = {
  userInput: '',
  isGenerating: false,
  currentIteration: 0,
  maxIterations: 5,
  initialTestCases: { passing: [], failing: [] },
  newTestCases: { passing: [], failing: [] },
  agents: [],
  showResults: false
};

let generationState: GenerationState = { ...initialState };

// Simulated delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Start the regex generation process
export const startRegexGeneration = async (input: string): Promise<void> => {
  // Reset the state
  generationState = { 
    ...initialState,
    userInput: input,
    isGenerating: true,
    agents: [
      { id: 1, status: 'pending' },
      { id: 2, status: 'pending' },
      { id: 3, status: 'pending' }
    ],
    showResults: true
  };

  // Simulate the backend process running asynchronously
  simulateGenerationProcess().catch(console.error);
};

// Get the current state of the generation process
export const getGenerationState = async (): Promise<GenerationState> => {
  // Return a copy of the state to prevent mutation
  return { ...generationState };
};

// Simulate the generation process
const simulateGenerationProcess = async (): Promise<void> => {
  try {
    for (let iteration = 1; iteration <= generationState.maxIterations; iteration++) {
      generationState.currentIteration = iteration;
      
      // Step 1: Agent 1 creates test cases
      await delay(1500);
      generationState.initialTestCases = generateMockTestCases();
      
      // Step 2: Agents generate regexes
      await delay(1000);
      
      // Update Agent 1 status
      updateAgentState(1, 'evaluating');
      
      // Simulate Agent 2 starting and completing
      await delay(800);
      updateAgentState(2, 'evaluating', generateMockRegex());
      
      // Simulate Agent 3 starting and completing
      await delay(1200);
      updateAgentState(3, 'completed', generateMockRegex(), Math.floor(70 + Math.random() * 30));
      
      // Step 3: Agent 1 evaluates regexes
      await delay(1500);
      updateAgentState(2, 'completed', undefined, Math.floor(70 + Math.random() * 30));
      updateAgentState(1, 'completed', generateMockRegex(), Math.floor(70 + Math.random() * 30));
      
      // Step 4: Agent 1 creates new test cases
      await delay(1200);
      generationState.newTestCases = generateMockTestCases();
      
      // If it's not the last iteration, reset agent states for next round
      if (iteration < generationState.maxIterations) {
        resetAgentsForNextIteration();
        await delay(1500);
      }
    }
    
    // Generation completed
    generationState.isGenerating = false;
  } catch (error) {
    console.error('Error in regex generation simulation:', error);
    generationState.isGenerating = false;
  }
};

// Helper functions for the simulation
const updateAgentState = (
  id: number, 
  status: 'pending' | 'evaluating' | 'completed',
  regex?: string,
  score?: number
): void => {
  const agent = generationState.agents.find(a => a.id === id);
  if (agent) {
    agent.status = status;
    if (regex) agent.regex = regex;
    if (score !== undefined) agent.score = score;
  }
};

const resetAgentsForNextIteration = (): void => {
  generationState.agents.forEach(agent => {
    agent.status = 'pending';
    agent.regex = undefined;
    agent.score = undefined;
  });
};

// Mock data generators
const generateMockRegex = (): string => {
  const regexPatterns = [
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "^\\d{3}-\\d{3}-\\d{4}$",
    "^(19|20)\\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$",
    "^(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([/\\w \\.-]*)*\\/?$",
    "^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$"
  ];
  
  return regexPatterns[Math.floor(Math.random() * regexPatterns.length)];
};

const generateMockTestCases = (): TestCases => {
  const mockPassingCases = [
    "valid123@example.com",
    "user-name@domain.co.uk",
    "test.email+tag@example.org",
    "123-456-7890",
    "2023-01-15",
    "https://www.example.com",
    "e4eaaaf2-d142-4d73-8cb1-2863c6d42e8e"
  ];
  
  const mockFailingCases = [
    "invalid@email",
    "missing@domain",
    "123-456-789",
    "2023-13-32",
    "not-a-url",
    "not-a-uuid"
  ];
  
  // Randomly select some test cases
  const passingCount = 3 + Math.floor(Math.random() * 4);
  const failingCount = 2 + Math.floor(Math.random() * 3);
  
  const shuffleAndTake = (array: string[], count: number) => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  return {
    passing: shuffleAndTake(mockPassingCases, passingCount),
    failing: shuffleAndTake(mockFailingCases, failingCount)
  };
};
