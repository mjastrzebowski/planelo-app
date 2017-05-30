export class IExercise {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
  categoryId: number;
}


export class Exercise implements IExercise {
  id: number;
  name: string;
  categoryId: number;

  constructor(name: string) {
    this.name = name;
  }
}
