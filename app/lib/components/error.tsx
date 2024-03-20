"use client";
import { Alert, IconButton } from "@mui/material";
import { useError } from "../providers/ErrorProvider";

export const ErrorAlert = () => {
  const { error, handleError } = useError();

  const handleCloseError = (e: React.SyntheticEvent) => {
    handleError("");
  };

  return error ? (
    <Alert
      severity="error"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleCloseError}
        >
          x
        </IconButton>
      }
    >
      {error}
    </Alert>
  ) : null;
};
