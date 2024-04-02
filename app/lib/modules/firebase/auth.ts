import { firebaseApp } from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { FirebaseAuthParams, FirebaseAuthResponse } from "./types/firebaseAuth";
import { getErrorMessage } from "../../utils/errors";

const auth = getAuth(firebaseApp);

const getUserAuth = () => {
  return auth;
};

const register = async (
  credentials: FirebaseAuthParams
): Promise<FirebaseAuthResponse> => {
  const { email, password } = credentials;
  let response = null;
  let error = null;

  try {
    response = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    userData: response,
    error,
  };
};

const login = async (
  credentials: FirebaseAuthParams
): Promise<FirebaseAuthResponse> => {
  const { email, password } = credentials;
  let response = null;
  let error = null;

  try {
    response = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    userData: response,
    error,
  };
};

const signout = async () => {
  let isSignedOut;
  let error;

  try {
    await signOut(auth);
    isSignedOut = true;
  } catch (e) {
    error = getErrorMessage(e);
    isSignedOut = false;
  }

  return {
    isSignedOut,
    error,
  };
};

const firebaseAuthService = {
  getUserAuth,
  register,
  login,
  signout,
};

export default firebaseAuthService;
