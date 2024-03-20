export const getErrorMessage = (error: any) => {
  let result;

  if (error instanceof Error) {
    return error.message;
  } else {
    return String(error);
  }
};
