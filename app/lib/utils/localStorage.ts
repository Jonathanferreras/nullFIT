import { getErrorMessage } from "./errors";

export const addItem = (key: string, item: any) => {
  let success, error;
  try {
    localStorage.setItem(key, JSON.stringify(item));
    success = true;
  } catch (err) {
    error = "Error adding to local storage, enable local storage in settings.";
  }

  return {
    success,
    error,
  };
};

export const getItem = (key: string) => {
  let data, error;
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      throw new Error("Value does not exist!");
    }

    data = JSON.parse(value);
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};
