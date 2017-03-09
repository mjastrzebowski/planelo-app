export class IActivityType {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
}


export class ActivityType implements IActivityType {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
