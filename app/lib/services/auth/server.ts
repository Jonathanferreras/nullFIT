import firebaseService from "../../firebase/service";
import { UserRegistrationData, UserLoginCredentials } from "./types";

const registerUser = async (user: UserRegistrationData) => {
  try {
    let validatedAccessKey;
    let assignedAccessKey;
    let registeredUser;

    validatedAccessKey = await firebaseService.validateAccessKey(
      user.accessKey
    );

    if (validatedAccessKey.error || !validatedAccessKey.isValidAccessKey) {
      throw new Error(validatedAccessKey.error || "Invalid access key");
    }

    assignedAccessKey = await firebaseService.assignAccessKeyToUser({
      email: user.email,
      accessKey: user.accessKey,
    });

    if (assignedAccessKey.error || !assignedAccessKey.isAssignedAccessKey) {
      throw new Error(
        assignedAccessKey.error || "Failed to assign access key to user"
      );
    }

    registeredUser = await firebaseService.register(user);

    if (registeredUser.error) {
      await firebaseService.unassignAccessKeyToUser({
        accessKey: user.accessKey,
      });
      throw new Error(registeredUser.error);
    }

    return registeredUser;
  } catch (error) {
    let err;

    if (error instanceof Error) {
      err = error.message;
    } else {
      err = String(error);
    }
    return { error: err };
  }
};

const loginUser = async (user: UserLoginCredentials) => {
  return await firebaseService.login(user);
};

const authService = { registerUser, loginUser };

export default authService;
