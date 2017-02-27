export class IExerciseComment {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  comment: string;
}


export class ExerciseComment implements IExerciseComment {
  id: number;
  comment: string;

  constructor(comment: string) {
    this.comment = comment;
  }
}
