export class IExerciseCategory {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  name: string;
}


export class ExerciseCategory implements IExerciseCategory {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
