export class ISession {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
  activityId?: number;
  time?: number;
  price?: number;
}


export class Session implements ISession {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
