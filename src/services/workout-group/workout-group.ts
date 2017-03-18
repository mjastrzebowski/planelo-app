export class IWorkoutGroup {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  workoutId: number;
}


export class WorkoutGroup implements IWorkoutGroup {
  id: number;
  workoutId: number;

  constructor(workoutId: number) {
    this.workoutId = workoutId;
  }
}
