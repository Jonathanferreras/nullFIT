"use client";
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createFilterOptions,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";

import { useState } from "react";
import RunningIcon from "@mui/icons-material/DirectionsRun";
import StrengthTrainingIcon from "@mui/icons-material/FitnessCenter";
import CustomStarIcon from "@mui/icons-material/Star";

import useFetchDefaultExercises from "../lib/hooks/exercises/useFetchDefaultExercises";
import useFetchCustomExercises from "../lib/hooks/exercises/useFetchCustomExercises";
import { ExerciseType } from "../lib/models/exercise";

export default function CreateWorkout() {
  const defaultExercises = useFetchDefaultExercises();
  const customExercises = useFetchCustomExercises();
  const filter = createFilterOptions();
  const [workoutState, setWorkoutState] = useState<{
    title: string;
    exercises: any[];
  }>({
    title: "",
    exercises: [],
  });
  const [currentExercise, setCurrentExercise] = useState({
    name: "",
    default: true,
    type: 0,
    sets: 0,
    reps: [],
    customReps: false,
    restTime: 0,
    duration: 0,
  });

  const handleExerciseTypeToggle = (
    _e: React.MouseEvent<HTMLElement>,
    update: number
  ) => {
    setCurrentExercise({ ...currentExercise, name: "", type: update });
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setWorkoutState({
      ...workoutState,
      [name]: value,
    });
  };

  const handleAddExercise = (e: React.SyntheticEvent) => {};

  const handleAutoCompleteOnChange = (_e: any, value: any) => {
    let exercise: any = {};

    if (!value) {
      exercise.name = "";
      exercise.default = true;
    } else if (typeof value === "string") {
      exercise.name = value;
      exercise.default = true;
    } else if (value && value.inputValue) {
      exercise.name = value.inputValue;
    } else {
      exercise.name = value.name;
    }

    setCurrentExercise({ ...currentExercise, ...exercise });
  };

  const handleAutoCompleteFilterOptions = (options: any, params: any) => {
    const filtered = filter(options, params);

    const { inputValue }: { inputValue: string } = params;
    const isExisting = options.some(
      (option: { name: any }) => inputValue === option.name
    );
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
      });
    }

    return filtered;
  };

  const handleGetAutoCompleteOptionLabel = (option: any) => {
    if (typeof option === "string") {
      return option;
    }
    if (option.inputValue) {
      return option.inputValue;
    }
    return option.name;
  };

  const renderAutoCompleteOptions = (props: any, option: any) => {
    const newProps = (({ key, ...rest }) => rest)(props);

    return (
      <li key={option.id} {...newProps}>
        {option.name}
        {!option.default && <CustomStarIcon />}
      </li>
    );
  };

  const renderAutoCompleteInput = (params: any) => {
    return <TextField {...params} label="Select Exercise" />;
  };

  const renderExerciseBuilder = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <Container>
          <CardHeader
            action={
              <ToggleButtonGroup
                value={currentExercise.type}
                exclusive
                onChange={handleExerciseTypeToggle}
                aria-label="exercise type toggle"
              >
                <ToggleButton value={0} aria-label="strength training">
                  <StrengthTrainingIcon />
                </ToggleButton>
                <ToggleButton value={1} aria-label="cardio">
                  <RunningIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            }
            title={"Exercise"}
            subheader={
              currentExercise.type === ExerciseType.strength
                ? "Strength"
                : "Cardio"
            }
          />
          <CardContent>
            <FormGroup>
              <Stack spacing={2}>
                <Autocomplete
                  value={currentExercise}
                  id="select-exercise"
                  sx={{ width: 300 }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  options={[...customExercises, ...defaultExercises].filter(
                    (exercise) => exercise.type === currentExercise.type
                  )}
                  onChange={handleAutoCompleteOnChange}
                  filterOptions={handleAutoCompleteFilterOptions}
                  getOptionLabel={handleGetAutoCompleteOptionLabel}
                  renderOption={renderAutoCompleteOptions}
                  renderInput={renderAutoCompleteInput}
                />
                {currentExercise.name &&
                  (currentExercise.type === 0 ? (
                    <>
                      <TextField
                        required
                        label="Sets"
                        placeholder="Sets"
                        value={currentExercise.sets}
                        name="sets"
                        onChange={(e) =>
                          setCurrentExercise({
                            ...currentExercise,
                            sets: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      {/* <Stack direction="row" spacing={2}> */}
                      {currentExercise.customReps ? (
                        Array(currentExercise.sets)
                          .fill(null)
                          .map((_, index) => (
                            <TextField
                              required
                              key={"rep" + index + 1}
                              label={"Reps for set " + (index + 1)}
                              placeholder="Reps"
                              value={currentExercise.reps[index]}
                              name="reps"
                            />
                          ))
                      ) : (
                        <TextField
                          required
                          label="Reps"
                          placeholder="Reps"
                          value={currentExercise.reps[0]}
                          name="reps"
                        />
                      )}

                      <FormControlLabel
                        control={
                          <Switch
                            onChange={() =>
                              setCurrentExercise({
                                ...currentExercise,
                                customReps: !currentExercise.customReps,
                              })
                            }
                          />
                        }
                        label="Custom Reps?"
                      />
                      {/* </Stack> */}
                    </>
                  ) : (
                    <>
                      <TextField
                        required
                        label="Duration"
                        placeholder="Duration"
                        value={currentExercise.duration}
                        name="duration"
                      />
                    </>
                  ))}
              </Stack>
            </FormGroup>
          </CardContent>
          <CardActions>
            <Button
              disabled={currentExercise.name === ""}
              onClick={handleAddExercise}
            >
              Add Exercise
            </Button>
          </CardActions>
        </Container>
      </Card>
    );
  };

  return (
    <main>
      <Container maxWidth="sm">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>Create Workout</h2>
          <Stack spacing={2}>
            <FormGroup onChange={handleOnChange}>
              <TextField
                required
                label="Title"
                placeholder="Title"
                name="title"
                value={workoutState.title}
              />
            </FormGroup>
            {renderExerciseBuilder()}
          </Stack>
        </div>
      </Container>
    </main>
  );
}
