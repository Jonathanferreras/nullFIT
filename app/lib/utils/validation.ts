export const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string) => {
  return /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password);
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
) => {
  return confirmPassword === password;
};

export const validateAccessKey = (accessKey: string) => {
  return /^[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}$/.test(accessKey);
};
