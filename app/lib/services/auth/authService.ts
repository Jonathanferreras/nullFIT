import { ACCESS_KEYS_COLLECTION } from "../../constants/db";
import authServiceImpl from "../../modules/firebase/auth";
import repositoryImpl from "../../modules/firebase/repository";
import { getErrorMessage } from "../../utils/errors";
import { UserRegistrationData, UserLoginCredentials } from "./types";

const registerUser = async (user: UserRegistrationData) => {
  let validatedAccessKey;
  let assignedAccessKey;
  let registeredUser;
  let error;

  try {
    validatedAccessKey = await isValidateAccessKey(user.accessKey);

    if (validatedAccessKey.error || !validatedAccessKey.isValid) {
      throw new Error(validatedAccessKey.error || "Invalid access key");
    }

    assignedAccessKey = await assignAccessKeyToUser(user.email, user.accessKey);

    if (assignedAccessKey.error || !assignedAccessKey.isAssigned) {
      throw new Error(
        assignedAccessKey.error || "Failed to assign access key to user"
      );
    }

    registeredUser = await authServiceImpl.register(user);

    if (registeredUser.error) {
      await unassignAccessKeyToUser(user.accessKey);
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
    loggedInUser = await authServiceImpl.login(user);

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
  let isSignedOut;
  let error;

  try {
    const response = await authServiceImpl.signout();

    if (response.error) {
      throw new Error(
        response.error || "Error in signing out, please try again!"
      );
    }

    isSignedOut = response.isSignedOut;
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isSignedOut,
    error,
  };
};

const onAuthChange = (handler: Function) => {
  const auth = authServiceImpl.getUserAuth();
  const onAuthChangeListener = auth.onAuthStateChanged((user) => handler(user));

  return onAuthChangeListener;
};

const isValidateAccessKey = async (accessKey: string) => {
  const accessKeyField = "key";
  let isValid = false;
  let error;

  try {
    const response = await repositoryImpl.getItemByField({
      collectionName: ACCESS_KEYS_COLLECTION,
      fieldName: accessKeyField,
      value: accessKey,
    });

    if (!response.data || response.error) {
      throw new Error(response.error || "Invalid access key!");
    }

    if (response.data.email) {
      throw new Error("Access key already assigned");
    }

    isValid = true;
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isValid,
    error,
  };
};

const assignAccessKeyToUser = async (email: string, accessKey: string) => {
  const accessKeyField = "key";
  let isAssigned = false;
  let error = null;

  try {
    const response = await repositoryImpl.getItemByField({
      collectionName: ACCESS_KEYS_COLLECTION,
      fieldName: accessKeyField,
      value: accessKey,
    });

    if (!response.data || response.error) {
      throw new Error(response.error || "Invalid access key!");
    }

    if (response.data.email) {
      throw new Error("Access key already assigned");
    }

    const updatedData = await repositoryImpl.updateItem({
      collectionName: ACCESS_KEYS_COLLECTION,
      itemId: response.data.id,
      value: { email },
    });

    if (!updatedData.data || updatedData.error) {
      throw new Error(
        updatedData.error || "Unable to confirm access key assignment"
      );
    }

    isAssigned = true;
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isAssigned,
    error,
  };
};

const unassignAccessKeyToUser = async (accessKey: string) => {
  const accessKeyField = "key";
  let isUnassigned = false;
  let error;

  try {
    const response = await repositoryImpl.getItemByField({
      collectionName: ACCESS_KEYS_COLLECTION,
      fieldName: accessKeyField,
      value: accessKey,
    });

    if (!response.data || response.error) {
      throw new Error(response.error || "Invalid access key!");
    }

    if (!response.data.email) {
      throw new Error("Unable to unassign access key!");
    }

    const updatedData = await repositoryImpl.updateItem({
      collectionName: ACCESS_KEYS_COLLECTION,
      itemId: response.data.id,
      value: { email: "" },
    });

    if (updatedData.data?.email || updatedData.error) {
      throw new Error(
        updatedData.error || "Unable to confirm key has not been unassigned"
      );
    }

    isUnassigned = updatedData.data?.email === "";
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isUnassigned,
    error,
  };
};

const authService = { registerUser, loginUser, signoutUser, onAuthChange };

export default authService;
