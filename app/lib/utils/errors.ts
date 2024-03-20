export const getErrorMessage = (error: any) => {
  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
};
