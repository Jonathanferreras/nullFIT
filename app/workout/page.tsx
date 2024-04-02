"use client";
import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WorkoutState,
  fetchDefaultExercises,
} from "../lib/modules/redux/workoutSlice";
import { AppDispatch } from "../lib/modules/redux/store";
import { Exercise } from "../lib/models/exercise";

export default function Workout() {
  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector((state: any) => state.workout.exercises);

  useEffect(() => {
    const getDefaultExercises = async () => {
      await dispatch(fetchDefaultExercises());
    };

    getDefaultExercises();
  }, [dispatch]);

  return (
    <main>
      <Container maxWidth="sm">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Workout</h2>
          <ul>
            {exercises.map((exercise: Exercise) => (
              <li key={exercise.id}>{exercise.name}</li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
