import { CollectionDataItem } from "./types/collectionDataItem";
import { firebaseApp } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getErrorMessage } from "../../utils/errors";

const db = getFirestore(firebaseApp);

const createItem = async (collectionName: string, value: any) => {
  let data;
  let error;

  try {
    const docRef = await addDoc(collection(db, collectionName), value);

    if (!docRef.id) {
      throw new Error("Unable to confirm if item was created!");
    }

    data = docRef.id; // Return the ID of the newly created document
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const getAllItems = async (collectionName: string) => {
  let data;
  let error;

  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    if (querySnapshot.empty) {
      throw new Error("Requested items does not exist!");
    }

    data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const getAllItemsByField = async <T extends CollectionDataItem>({
  collectionName,
  fieldName,
  value,
}: {
  collectionName: string;
  fieldName: string;
  value: any;
}) => {
  let data;
  let error;

  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", value)
    );
    const querySnapshot = await getDocs(collection(db, collectionName));

    if (querySnapshot.empty) {
      throw new Error("Requested items does not exist!");
    }

    data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T),
    }));
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const getItemById = async <T extends CollectionDataItem>(
  collectionName: string,
  id: string
) => {
  let data;
  let error;

  try {
    const document = await getDoc(doc(db, collectionName, id));

    if (!document.exists()) {
      throw new Error("Requested item doesn't exist!");
    }

    data = document.data() as T;
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const getItemByField = async <T extends CollectionDataItem>({
  collectionName,
  fieldName,
  value,
}: {
  collectionName: string;
  fieldName: string;
  value: any;
}) => {
  let data;
  let error;

  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, "==", value)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Requested item doesn't exist!");
    }

    data = {
      id: querySnapshot.docs[0].id,
      ...(querySnapshot.docs[0].data() as T),
    };
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const updateItem = async ({
  collectionName,
  itemId,
  value,
}: {
  collectionName: string;
  itemId: string;
  value: any;
}) => {
  let data;
  let error;

  try {
    await updateDoc(doc(db, collectionName, itemId), value);
    const updatedDoc = await getItemById(collectionName, itemId);

    if (updatedDoc.error) {
      throw new Error(updatedDoc.error || "Error confirming updated doc");
    }

    data = { ...updatedDoc.data };
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const deleteItem = async (collectionName: string, itemId: string) => {
  let data;
  let error;

  try {
    await deleteDoc(doc(db, collectionName, itemId));
    const deletedDoc = await getItemById(collectionName, itemId);

    if (deletedDoc.data || deletedDoc.error) {
      throw new Error(deletedDoc.error || "Error confirming updated doc");
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    data,
    error,
  };
};

const firebaseRepository = {
  createItem,
  getAllItems,
  getAllItemsByField,
  getItemById,
  getItemByField,
  updateItem,
  deleteItem,
};

export default firebaseRepository;
