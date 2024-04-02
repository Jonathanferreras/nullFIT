export enum ExerciseType {
  strength = 0,
  cardio = 1,
}

export interface Exercise {
  id: string;
  userId?: string;
  name: string;
  default: boolean;
  type: ExerciseType;
}
