import { Exercise } from "./exercise";

export interface WorkoutExercise {
  exercise: Exercise;
  sets?: number;
  reps?: number | number[];
  restTime?: number;
  duration?: number;
}
