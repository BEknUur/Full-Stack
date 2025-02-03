import React from "react";

export const Input = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input {...props} className="border rounded px-3 py-2" />;
};
