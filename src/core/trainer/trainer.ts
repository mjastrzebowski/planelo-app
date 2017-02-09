export class ITrainer {
  completed: boolean;
  createdAt: number;
  id?: number;
  key?: string;
  title: string;
  email: string;
  place?: string;
  hours: any[];
  vacation?: any[];
  username?: string;

  delete?: any;
}


export class Trainer implements ITrainer {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  title: string;
  email: string;
  hours: any[];

  constructor(title: string, email: string, hours: any[]) {
    this.title = title;
    this.email = email;
    this.hours = hours;
  }
}
