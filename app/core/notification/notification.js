export interface INotification {
  completed: boolean;
  createdAt: number;
  key?: string;
  type: string;
  clientKey?: string;
  client?: any;
  workout?: any;
  trainer?: any;
  owner?: string;
  reason?: string;
  data?: any;
}

export class Notification implements INotification {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  type: string;
  data: any;
  client: any;
  owner: string;
  reason: string;
  workout: any;
  trainer: any;

  constructor(type: string, data: any) {
    this.type = type;
    if (data.client) {
      this.client = data.client;
    }
    if (data.owner) {
      this.owner = data.owner;
    }
    if (data.workout) {
      this.workout = data.workout;
    }
    if (data.trainer) {
      this.trainer = data.trainer;
    }
    if (data.reason) {
      this.reason = data.reason;
    }
  }
}
