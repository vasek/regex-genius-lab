
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface InputFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast({
        title: "Input required",
        description: "Please describe the regex pattern you need.",
        variant: "destructive",
      });
      return;
    }
    onSubmit(input);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="bg-card rounded-xl p-6 shadow-subtle transition-all duration-300 card-glow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-medium">Describe the regex pattern</h2>
            <p className="text-sm text-muted-foreground">
              Explain what you need the regular expression to match or validate
            </p>
          </div>
          
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="For example: Match valid email addresses, 10-digit phone numbers, or extract dates in YYYY-MM-DD format..."
            className="min-h-[120px] resize-none transition-all duration-300 border-input focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
          />
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              className="w-full sm:w-auto transition-all duration-300 px-8 py-6 h-auto font-medium bg-primary text-white hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2">Processing</span>
                  <div className="spinner" />
                </span>
              ) : (
                <span className="flex items-center">
                  <span>Start Generating</span>
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
