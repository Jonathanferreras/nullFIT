import { EXERCISES_COLLECTION } from "../../constants/db";
import repositoryImpl from "../../modules/firebase/repository";
import { getErrorMessage } from "../../utils/errors";

const createExercise = () => console.log("implement");

const getAllDefaultExercises = async () => {
  const defaultField = "default";
  let exercises;
  let error;
  try {
    const response = await repositoryImpl.getAllItemsByField({
      collectionName: EXERCISES_COLLECTION,
      fieldName: defaultField,
      value: true,
    });

    if (!response.data || response.error) {
      throw new Error(response.error || "Error fetching all exercises");
    }

    exercises = response.data;
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
  createWorkoutExercise,
  createWorkout,
};

export default workoutService;
