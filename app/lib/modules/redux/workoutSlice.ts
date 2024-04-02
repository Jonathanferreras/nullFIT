import { createSlice } from "@reduxjs/toolkit";

export interface WorkoutState {}

const initialState: WorkoutState = {};

export const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout: (state, action) => {
      // implement
    },
    addExercise: (state, action) => {
      // implement
    },
  },
});

// Action creators are generated for each case reducer function
export const { addWorkout } = workoutSlice.actions;

export default workoutSlice.reducer;
