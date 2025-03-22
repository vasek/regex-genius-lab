
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 sm:py-8 w-full">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center mr-3">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary-foreground"
              >
                <path d="M17 3v10" />
                <path d="m12.67 5.5 8.66 5" />
                <path d="m12.67 10.5 8.66-5" />
                <path d="M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Regex Genius Lab</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Create precise regular expressions with AI-powered assistance
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
