export class IWorkout {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  routineDayId: number;
  name: string;
  description: string;
}


export class Workout implements IWorkout {
  id: number;
  routineDayId: number;
  name: string;
  description: string;

  constructor(routineDayId: number) {
    this.routineDayId = routineDayId;
  }
}
