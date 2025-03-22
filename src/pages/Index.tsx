import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import ResultsPanel from "@/components/ResultsPanel";
import {
  startRegexGeneration,
  getGenerationState,
} from "@/services/regexService";
import { GenerationState } from "@/types";

const POLL_INTERVAL = 1000;

const Index = () => {
  const [state, setState] = useState<GenerationState>({
    userInput: "",
    isGenerating: false,
    currentIteration: 0,
    maxIterations: 5,
    iterations: [],
    showResults: false,
  });

  // Poll for state updates when generation is in progress
  useEffect(() => {
    let intervalId: number | undefined;

    if (state.isGenerating) {
      intervalId = window.setInterval(async () => {
        try {
          const newState = await getGenerationState();
          setState((prevState) => ({
            ...prevState,
            ...newState,
          }));

          // Stop polling once generation is complete
          if (!newState.isGenerating) {
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error("Error polling for generation state:", error);
          clearInterval(intervalId);
        }
      }, POLL_INTERVAL);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [state.isGenerating]);

  const handleSubmit = async (input: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        isGenerating: true,
        userInput: input,
        showResults: false,
      }));

      await startRegexGeneration(input);

      // Initial state update after starting generation
      const initialState = await getGenerationState();
      setState((prevState) => ({
        ...prevState,
        ...initialState,
      }));
    } catch (error) {
      console.error("Error starting regex generation:", error);
      setState((prevState) => ({
        ...prevState,
        isGenerating: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <Header />

        <main className="py-6 flex flex-col items-center">
          <div className="w-full max-w-4xl">
            <InputForm onSubmit={handleSubmit} isLoading={state.isGenerating} />

            <ResultsPanel
              userInput={state.userInput}
              currentIteration={state.currentIteration}
              maxIterations={state.maxIterations}
              iterations={state.iterations}
              isVisible={state.showResults}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
