export class IRoutineDayWorkout {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  routineDayId: number;
  workoutId: number;
}


export class RoutineDayWorkout implements IRoutineDayWorkout {
  id: number;
  routineDayId: number;
  workoutId: number;

  constructor(routineDayId: number, workoutId: number) {
    this.routineDayId = routineDayId;
    this.workoutId = workoutId;
  }
}
