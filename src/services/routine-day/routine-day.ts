export class IRoutineDay {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  routineId: number;
  name: string;
}


export class RoutineDay implements IRoutineDay {
  id: number;
  routineId: number;
  name: string;

  constructor(routineId: number) {
    this.routineId = routineId;
  }
}
