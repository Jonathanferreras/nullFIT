import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workoutService from "../../services/workout/workoutService";
import { Exercise } from "../../models/exercise";
import { getErrorMessage } from "../../utils/errors";

export interface WorkoutState {
  exercises: any[];
}

const initialState: WorkoutState = {
  exercises: [],
};

// todo: grab default exercises and display them

export const fetchDefaultExercises = createAsyncThunk(
  "workout/fetchDefaultExercises",
  async () => {
    let data;
    let error;

    try {
      const response = await workoutService.getAllDefaultExercises();

      if (response.error) {
        throw new Error(response.error || "Error fetching all exercises");
      }

      data = response.exercises;
    } catch (e) {
      error = getErrorMessage(e);
    }

    return {
      data,
      error,
    };
  }
);

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchDefaultExercises.fulfilled, (state, action) => {
      // Add user to the state array
      if (!action.payload.error && action.payload.data) {
        state.exercises = action.payload.data;
      }
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = workoutSlice.actions;

export default workoutSlice;
