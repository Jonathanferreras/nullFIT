import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import workoutService from "../../services/workout/workoutService";
import { Exercise } from "../../models/exercise";
import { getErrorMessage } from "../../utils/errors";

export interface WorkoutState {
  defaultExercises: any[];
  customExercises: any[];
}

const initialState: WorkoutState = {
  defaultExercises: [],
  customExercises: [],
};

export const fetchDefaultExercises = createAsyncThunk(
  "workout/fetchDefaultExercises",
  async () => {
    let data;
    let error;

    try {
      const response = await workoutService.getAllDefaultExercises();

      if (response.error) {
        throw new Error(
          response.error || "Error fetching all default exercises"
        );
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

export const fetchCustomExercises = createAsyncThunk(
  "workout/fetchCustomExercises",
  async (userId: string) => {
    let data;
    let error;

    try {
      const response = await workoutService.getAllCustomExercises(userId);

      if (response.error) {
        throw new Error(
          response.error || "Error fetching all custom exercises"
        );
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
    builder.addCase(fetchDefaultExercises.fulfilled, (state, action) => {
      if (!action.payload.error && action.payload.data) {
        state.defaultExercises = action.payload.data;
      }
    });
    builder.addCase(fetchCustomExercises.fulfilled, (state, action) => {
      if (!action.payload.error && action.payload.data) {
        state.customExercises = action.payload.data;
      }
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = workoutSlice.actions;

export default workoutSlice;
