import authService from "./server";
import { UserRegistrationData } from "./types";

const registerUser = async (user: UserRegistrationData) => {
  return await authService.registerUser(user);
};

const loginUser = async (user: { email: string; password: string }) => {
  // return await login(user);
};

export { registerUser, loginUser };
