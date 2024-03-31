import { firebaseApp } from "./config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { FirebaseAuthParams, FirebaseAuthResponse } from "./types";
import { getErrorMessage } from "../../utils/errors";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Authentication

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

const validateAccessKey = async (accessKey: string) => {
  let isValidAccessKey = false;
  let error = null;

  try {
    const collectionName = "access_keys";
    const accessKeyRef = collection(db, collectionName);
    const q = query(accessKeyRef, where("key", "==", accessKey));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const item = doc.data();

        if (!item.email) {
          isValidAccessKey = true;
        } else {
          error = "Access key already assigned";
        }
      });
    } else {
      error = "Invalid access key!";
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isValidAccessKey,
    error,
  };
};

const assignAccessKeyToUser = async ({
  email,
  accessKey,
}: {
  email: string;
  accessKey: string;
}) => {
  let isAssignedAccessKey = false;
  let error = null;

  try {
    const collectionName = "access_keys";
    const accessKeyRef = collection(db, collectionName);
    const q = query(accessKeyRef, where("key", "==", accessKey));
    const querySnapshot = await getDocs(q);

    for (const document of querySnapshot.docs) {
      const item = document.data();

      if (!item.email) {
        await updateDoc(doc(db, collectionName, document.id), { email });

        const assignedAccessKey = await getDoc(
          doc(db, collectionName, document.id)
        );

        isAssignedAccessKey = assignedAccessKey.exists();
      } else {
        error = "Unable to assign access key!";
      }

      break;
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isAssignedAccessKey,
    error,
  };
};

const unassignAccessKeyToUser = async ({
  accessKey,
}: {
  accessKey: string;
}) => {
  let isUnassignedAccessKey = false;
  let error = null;

  try {
    const collectionName = "access_keys";
    const accessKeyRef = collection(db, collectionName);
    const q = query(accessKeyRef, where("key", "==", accessKey));
    const querySnapshot = await getDocs(q);

    for (const document of querySnapshot.docs) {
      const item = document.data();

      if (item.email) {
        await updateDoc(doc(db, collectionName, document.id), { email: "" });

        const unassignedAccessKey = await getDoc(
          doc(db, collectionName, document.id)
        );

        isUnassignedAccessKey = unassignedAccessKey.data()?.email === "";
      } else {
        error = "Unable to unassign access key!";
      }

      break;
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    isUnassignedAccessKey,
    error,
  };
};

const firebaseAuthService = {
  getUserAuth,
  register,
  login,
  signout,
  validateAccessKey,
  assignAccessKeyToUser,
  unassignAccessKeyToUser,
};

export default firebaseAuthService;
