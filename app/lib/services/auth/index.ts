import firebaseService from "../../modules/firebase/service";
import { getErrorMessage } from "../../utils/errors";
import { UserRegistrationData, UserLoginCredentials } from "./types";

const registerUser = async (user: UserRegistrationData) => {
  let validatedAccessKey;
  let assignedAccessKey;
  let registeredUser;
  let error;

  try {
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
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    registeredUser,
    error,
  };
};

const loginUser = async (user: UserLoginCredentials) => {
  let loggedInUser;
  let error;

  try {
    loggedInUser = await firebaseService.login(user);

    if (loggedInUser.error) {
      throw new Error(
        loggedInUser.error || "Failed to login, please try again!"
      );
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    loggedInUser,
    error,
  };
};

const signoutUser = async () => {
  let user;
  let error;

  try {
    user = await firebaseService.signout();

    if (user.error) {
      throw new Error(user.error || "Error in signing out, please try again!");
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isSignedOut: user?.isSignedOut,
    error,
  };
};

const onAuthChange = (handler: Function) => {
  const auth = firebaseService.getUserAuth();
  const onAuthChangeListener = auth.onAuthStateChanged((user) => handler(user));

  return onAuthChangeListener;
};

const authService = { registerUser, loginUser, signoutUser, onAuthChange };

export default authService;
