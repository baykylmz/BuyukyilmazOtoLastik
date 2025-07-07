import React from 'react';

interface ValidationErrorProps {
  error?: string | null;
  className?: string;
}

const ValidationError: React.FC<ValidationErrorProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <div className={`mt-1 text-sm text-red-600 ${className}`}>
      <div className="flex items-center">
        <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ValidationError; 