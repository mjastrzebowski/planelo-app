export class IExercise {
  createdAt?: number;
  key?: string;
  hide?: boolean;
  name: string;
}


export class Exercise implements IExercise {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
