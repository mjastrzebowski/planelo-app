export class ISessionActivity {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
  activityId?: number;
  time?: number;
  price?: number;
}


export class SessionActivity implements ISessionActivity {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
