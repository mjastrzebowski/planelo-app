export class INotification {
  completed: boolean;
  createdAt: number;
  id: number;
  key?: string;
  type: string;
  clientKey?: string;
  client?: any;
  workout?: any;
  trainer?: any;
  admin?: string;
  reason?: string;
  data?: any;
  fromNow?: any;
  descDate?: any;
  unread?: any;
}

export class Notification implements INotification {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  id: number;
  type: string;
  data: any;
  client: any;
  admin: string;
  reason: string;
  workout: any;
  trainer: any;

  constructor(type: string, data: any) {
    this.type = type;
    if (data.client) {
      this.client = data.client;
    }
    if (data.admin) {
      this.admin = data.admin;
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
