export class IActivity {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  name: string;
  activityTypeId?: number;
}


export class Activity implements IActivity {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
