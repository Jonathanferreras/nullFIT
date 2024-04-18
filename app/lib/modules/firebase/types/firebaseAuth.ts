import { User, UserCredential } from "firebase/auth";

export interface FirebaseAuthUser {
  user: User | null;
}

export interface FirebaseAuthParams {
  email: string;
  password: string;
}

export interface FirebaseAuthResponse {
  userData: UserCredential | null;
  error: string | null;
}
