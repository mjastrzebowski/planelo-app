export class IWorkoutGroupType {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
}


export class WorkoutGroupType implements IWorkoutGroupType {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
