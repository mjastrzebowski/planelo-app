export class IExerciseMuscle {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  exerciseId: number;
  muscleId: number;
}


export class ExerciseMuscle implements IExerciseMuscle {
  id: number;
  exerciseId: number;
  muscleId: number;

  constructor(exerciseId: number, muscleId: number) {
    this.exerciseId = exerciseId;
    this.muscleId = muscleId;
  }
}
