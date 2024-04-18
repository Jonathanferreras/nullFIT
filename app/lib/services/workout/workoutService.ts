import { EXERCISES_COLLECTION } from "../../constants/db";
import repositoryImpl from "../../modules/firebase/repository";
import { getErrorMessage } from "../../utils/errors";
import { addItem, getItem } from "../../utils/localStorage";

const createExercise = () => console.log("implement");

const getAllDefaultExercises = async () => {
  const localStorageKey = "defaultExercises";
  let locallyStored;
  let locallyAdded;
  let response;
  let exercises;
  let error;
  try {
    locallyStored = getItem(localStorageKey);

    if (locallyStored.error) {
      response = await repositoryImpl.getAllItemsByField({
        collectionName: EXERCISES_COLLECTION,
        fieldName: "default",
        value: true,
      });

      if (!response.data || response.error) {
        throw new Error(
          response.error || "Error fetching all default exercises"
        );
      }

      exercises = response.data;
      locallyAdded = addItem(localStorageKey, exercises);

      if (locallyAdded.error) {
        throw new Error(locallyAdded.error);
      }
    } else {
      exercises = locallyStored.data;
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    exercises,
    error,
  };
};

const getAllCustomExercises = async (userId: string) => {
  const localStorageKey = "customExercises";
  let response;
  let locallyStored;
  let locallyAdded;
  let exercises;
  let error;

  try {
    locallyStored = getItem(localStorageKey);

    if (locallyStored.error) {
      response = await repositoryImpl.getAllItemsByField({
        collectionName: EXERCISES_COLLECTION,
        fieldName: "userId",
        value: userId,
      });

      if (!response.data || response.error) {
        throw new Error(
          response.error || "Error fetching all custom exercises"
        );
      }

      exercises = response.data;
      locallyAdded = addItem(localStorageKey, exercises);

      if (locallyAdded.error) {
        throw new Error(locallyAdded.error);
      }
    } else {
      exercises = locallyStored.data;
    }
  } catch (e) {
    error = getErrorMessage(e);
  }

  return {
    exercises,
    error,
  };
};

const createWorkoutExercise = () => console.log("implement");

const createWorkout = () => console.log("implement");

const workoutService = {
  createExercise,
  getAllDefaultExercises,
  getAllCustomExercises,
  createWorkoutExercise,
  createWorkout,
};

export default workoutService;
