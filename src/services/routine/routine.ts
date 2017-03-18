export class IRoutine {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  name: string;
  description: string;
}


export class Routine implements IRoutine {
  id: number;
  name: string;
  description: string;

  constructor(name: string) {
    this.name = name;
  }
}
