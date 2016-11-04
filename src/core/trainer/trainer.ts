export class ITrainer {
  completed: boolean;
  createdAt: number;
  key?: string;
  title: string;
  email: string;
  hours: array;
  username?: string;
}


export class Trainer implements ITrainer {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  title: string;
  email: string;
  hours: array;

  constructor(title: string, email: string, hours: array) {
    this.title = title;
    this.email = email;
    this.hours = hours;
  }
}
