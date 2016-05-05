export interface ITrainer {
  completed: boolean;
  createdAt: number;
  key?: string;
  title: string;
  email: string;
  hours: array;
}


export class Trainer implements ITrainer {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  title: string;
  email: string;
  hours: array;

  constructor(title: string, email: string, hours: array) {
    this.title = title;
    this.email = email;
    this.hours = hours;
  }
}
