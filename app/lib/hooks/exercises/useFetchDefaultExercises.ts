import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDefaultExercises } from "../../modules/redux/workoutSlice";
import { AppDispatch, RootState } from "../../modules/redux/store";

function useFetchDefaultExercises() {
  const dispatch = useDispatch<AppDispatch>();
  const defaultExercises = useSelector(
    (state: RootState) => state.workout.defaultExercises
  );

  useEffect(() => {
    const getDefaultExercises = async () => {
      try {
        await dispatch(fetchDefaultExercises());
      } catch (error) {
        console.error("Error fetching default exercises:", error);
      }
    };

    getDefaultExercises();
  }, [dispatch]);

  return defaultExercises;
}

export default useFetchDefaultExercises;
