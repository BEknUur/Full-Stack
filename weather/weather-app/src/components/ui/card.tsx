import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`rounded-lg shadow-md bg-white p-4 ${className || ""}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};
