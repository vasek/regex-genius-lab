import React from "react";
import AgentCard from "./AgentCard";
import TestCasesDialog from "./TestCasesDialog";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Iteration } from "@/types";

interface ResultsPanelProps {
  userInput: string;
  currentIteration: number;
  maxIterations: number;
  iterations: Iteration[];
  isVisible: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({
  userInput,
  currentIteration,
  maxIterations,
  iterations,
  isVisible,
}) => {
  const [openIterations, setOpenIterations] = React.useState<
    Record<number, boolean>
  >({});

  React.useEffect(() => {
    // Open the current iteration by default
    setOpenIterations((prev) => ({
      ...prev,
      [currentIteration]: true,
    }));
  }, [currentIteration]);

  const toggleIteration = (iterationNumber: number) => {
    setOpenIterations((prev) => ({
      ...prev,
      [iterationNumber]: !prev[iterationNumber],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="bg-card rounded-xl p-6 shadow-elevated max-w-4xl mx-auto mt-8 animate-slide-in">
      <div className="space-y-6">
        {/* User input */}
        <div>
          <div className="text-xs font-medium text-muted-foreground mb-1">
            Input
          </div>
          <div className="text-lg font-medium">{userInput}</div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="h-6 px-2 font-medium">
            Iteration {currentIteration} of {maxIterations}
          </Badge>
        </div>

        {/* Iterations */}
        <div className="space-y-4">
          {iterations.map((iteration) => (
            <Collapsible
              key={iteration.number}
              open={openIterations[iteration.number]}
              className="border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger
                onClick={() => toggleIteration(iteration.number)}
                className="flex items-center justify-between w-full p-4 bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <span className="font-medium">
                  Iteration {iteration.number}
                </span>
                {openIterations[iteration.number] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 space-y-4">
                  {/* Test cases */}
                  <div className="bg-background/50 rounded-lg p-4 border shadow-subtle">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Test Cases</h3>
                      <TestCasesDialog
                        title={`Test Cases - Iteration ${iteration.number}`}
                        testCases={iteration.testCases}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <span>
                        {iteration.testCases.valid.length +
                          iteration.testCases.invalid.length}{" "}
                        test cases
                      </span>
                      <span className="mx-1">•</span>
                      <span className="text-green-600 dark:text-green-500">
                        {iteration.testCases.valid.length} valid
                      </span>
                      <span className="mx-1">•</span>
                      <span className="text-red-600 dark:text-red-500">
                        {iteration.testCases.invalid.length} invalid
                      </span>
                    </div>
                  </div>

                  {/* Agent cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {iteration.agents.map((agent) => (
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
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
