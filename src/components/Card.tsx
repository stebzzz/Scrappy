import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden ${className}`}>
      <div className="border-b border-gray-700 p-4">
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
      <div className="p-0">
        {children}
      </div>
    </div>
  );
}; 