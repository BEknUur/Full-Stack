import * as React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded-lg shadow-md p-4">{children}</div>;
};

export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b pb-2 text-lg font-bold">{children}</div>;
};

export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-2">{children}</div>;
};
