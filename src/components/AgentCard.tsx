import React from "react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agentNumber: string;
  status: "pending" | "evaluating" | "completed";
  regex?: string;
  score?: number;
  className?: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agentNumber,
  status,
  regex,
  score,
  className,
}) => {
  // Determine background color based on status and score
  const getBgColor = () => {
    if (status !== "completed") return "bg-amber-100 dark:bg-amber-900/30";

    if (score === undefined) return "bg-amber-100 dark:bg-amber-900/30";

    if (score >= 90) return "bg-emerald-100 dark:bg-emerald-900/30";
    if (score >= 75) return "bg-lime-100 dark:bg-lime-900/30";
    if (score >= 50) return "bg-amber-100 dark:bg-amber-900/30";
    return "bg-rose-100 dark:bg-rose-900/30";
  };

  // Render loading indicator for pending or evaluating status
  const renderLoadingState = () => {
    if (status === "pending" || status === "evaluating") {
      return (
        <div className="flex justify-center items-center mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-foreground/60 loading-dot"></div>
            <div className="w-2 h-2 rounded-full bg-foreground/60 loading-dot"></div>
            <div className="w-2 h-2 rounded-full bg-foreground/60 loading-dot"></div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Animate entry of the card
  const cardClasses = cn(
    "agent-card rounded-lg p-4 h-full animate-scale-in",
    getBgColor(),
    className
  );

  return (
    <div className={cardClasses}>
      <div className="flex flex-col h-full">
        <div className="text-sm font-medium mb-1">
          Agent {agentNumber}:{" "}
          {status.charAt(0).toUpperCase() + status.slice(1)}
          {status === "completed" && score !== undefined && (
            <span className="ml-1">{score}%</span>
          )}
        </div>

        {regex && (
          <div className="mt-2 mb-3 font-mono text-xs p-2 bg-background/80 rounded border overflow-x-auto">
            {regex}
          </div>
        )}

        {renderLoadingState()}
      </div>
    </div>
  );
};

export default AgentCard;
