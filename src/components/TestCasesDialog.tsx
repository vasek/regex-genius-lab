import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TestCasesDialogProps {
  title: string;
  testCases: {
    valid: string[];
    invalid: string[];
  };
}

const TestCasesDialog: React.FC<TestCasesDialogProps> = ({
  title,
  testCases,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-xs h-7 px-2 rounded-md border transition-all hover:bg-background/80 hover:border-input"
        >
          View test cases
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 my-2 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-sm font-medium mb-2 text-green-600 dark:text-green-400">
              Valid Test Cases
            </h3>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-3 border border-green-100 dark:border-green-900/30">
              {testCases.valid.length > 0 ? (
                <ul className="space-y-1">
                  {testCases.valid.map((test, index) => (
                    <li key={index} className="text-sm font-mono">
                      "{test}"
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No valid test cases yet
                </p>
              )}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-sm font-medium mb-2 text-red-600 dark:text-red-400">
              Invalid Test Cases
            </h3>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-3 border border-red-100 dark:border-red-900/30">
              {testCases.invalid.length > 0 ? (
                <ul className="space-y-1">
                  {testCases.invalid.map((test, index) => (
                    <li key={index} className="text-sm font-mono">
                      "{test}"
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No invalid test cases yet
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestCasesDialog;
