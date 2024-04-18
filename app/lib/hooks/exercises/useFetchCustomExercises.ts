import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomExercises,
  fetchDefaultExercises,
} from "../../modules/redux/workoutSlice";
import { AppDispatch, RootState } from "../../modules/redux/store";
import { useAuth } from "../../providers/AuthProvider";

function useFetchCustomExercises() {
  const dispatch = useDispatch<AppDispatch>();
  const customExercises = useSelector(
    (state: RootState) => state.workout.customExercises
  );
  const userAuth = useAuth();

  useEffect(() => {
    const runDispatch = async () => {
      try {
        const userId = userAuth.user?.email;

        if (userId) {
          await dispatch(fetchCustomExercises(userId));
        }
      } catch (error) {
        console.error("Error fetching custom exercises:", error);
      }
    };

    runDispatch();
  }, [dispatch, userAuth]);

  return customExercises;
}

export default useFetchCustomExercises;
