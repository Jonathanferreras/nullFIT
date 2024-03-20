"use client";
import { createContext, useContext, useState } from "react";

interface ErrorContext {
  error: string;
  handleError: (errorMessage: string) => void;
}

const ErrorContext = createContext<ErrorContext>({
  error: "",
  handleError: () => {},
});

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState("");

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
};
