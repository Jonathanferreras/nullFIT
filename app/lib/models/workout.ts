import { WorkoutExercise } from "./workoutExercise";

export interface Workout {
  name: string;
  exercises: WorkoutExercise[];
  scheduledDays: [];
  createdAt: Date;
  updatedAt: Date;
}
