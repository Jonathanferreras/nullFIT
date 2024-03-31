import { firebaseApp } from "./config";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseApp);

// todo

const firebaseStoreService = {};
export default firebaseStoreService;
