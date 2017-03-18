export class IWorkoutExercise {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  workoutGroupId: number;
  exerciseId: number;
}


export class WorkoutExercise implements IWorkoutExercise {
  id: number;
  workoutGroupId: number;
  exerciseId: number;

  constructor(workoutGroupId: number, exerciseId: number) {
    this.workoutGroupId = workoutGroupId;
    this.exerciseId = exerciseId;
  }
}
