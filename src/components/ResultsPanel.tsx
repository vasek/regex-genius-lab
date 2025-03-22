
import React from 'react';
import AgentCard from './AgentCard';
import TestCasesDialog from './TestCasesDialog';
import { Badge } from '@/components/ui/badge';

interface Agent {
  id: number;
  status: 'pending' | 'evaluating' | 'completed';
  regex?: string;
  score?: number;
}

interface TestCases {
  passing: string[];
  failing: string[];
}

interface ResultsPanelProps {
  userInput: string;
  currentIteration: number;
  maxIterations: number;
  initialTestCases: TestCases;
  newTestCases: TestCases;
  agents: Agent[];
  isVisible: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  userInput,
  currentIteration,
  maxIterations,
  initialTestCases,
  newTestCases,
  agents,
  isVisible
}) => {
  if (!isVisible) return null;

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevated max-w-4xl mx-auto mt-8 animate-slide-in">
      <div className="space-y-6">
        {/* User input and iteration counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">Input</div>
            <div className="text-lg font-medium">{userInput}</div>
          </div>
          <Badge variant="outline" className="h-6 px-2 font-medium self-start sm:self-auto">
            Iteration {currentIteration} of {maxIterations}
          </Badge>
        </div>

        {/* Test case sections */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Initial test cases */}
          <div className="bg-background/50 rounded-lg p-4 border shadow-subtle">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Generated test cases</h3>
              <TestCasesDialog 
                title="Initial Test Cases"
                testCases={initialTestCases}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              <span>{initialTestCases.passing.length + initialTestCases.failing.length} test cases</span>
              <span className="mx-1">•</span>
              <span className="text-green-600 dark:text-green-500">{initialTestCases.passing.length} passing</span>
              <span className="mx-1">•</span>
              <span className="text-red-600 dark:text-red-500">{initialTestCases.failing.length} failing</span>
            </div>
          </div>

          {/* New test cases */}
          <div className="bg-background/50 rounded-lg p-4 border shadow-subtle">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Generated new test cases</h3>
              <TestCasesDialog 
                title="Refined Test Cases"
                testCases={newTestCases}
              />
            </div>
            <div className="text-xs text-muted-foreground">
              <span>{newTestCases.passing.length + newTestCases.failing.length} test cases</span>
              <span className="mx-1">•</span>
              <span className="text-green-600 dark:text-green-500">{newTestCases.passing.length} passing</span>
              <span className="mx-1">•</span>
              <span className="text-red-600 dark:text-red-500">{newTestCases.failing.length} failing</span>
            </div>
          </div>
        </div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agentNumber={agent.id}
              status={agent.status}
              regex={agent.regex}
              score={agent.score}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
