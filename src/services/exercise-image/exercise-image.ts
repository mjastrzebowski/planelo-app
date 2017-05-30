export class IExerciseImage {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  image: string;
  source?: string;
}


export class ExerciseImage implements IExerciseImage {
  id: number;
  image: string;

  constructor(image: string) {
    this.image = image;
  }
}
