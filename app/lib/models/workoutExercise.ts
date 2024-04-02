import { Exercise } from "./exercise";

export interface WorkoutExercise {
  exercise: Exercise;
  sets?: number;
  reps?: number;
  restTime?: number;
  duration?: number;
}
