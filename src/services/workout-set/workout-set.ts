export class IWorkoutSet {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  exerciseId: number;
  volume: number;
  reps: number;
  rest: number;
}


export class WorkoutSet implements IWorkoutSet {
  id: number;
  exerciseId: number;
  volume: number;
  reps: number;
  rest: number;

  constructor(exerciseId: number, volume: number, reps: number) {
    this.exerciseId = exerciseId;
    this.volume = volume;
    this.reps = reps;
  }
}
