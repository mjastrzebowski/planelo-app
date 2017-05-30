export class IUser {
  completed: boolean;
  createdAt: number;
  id?: string;
  key: string;
  type: string;
}


export class User implements IUser {
  completed: boolean = false;
  createdAt: number; // = firebase.database['ServerValue']['TIMESTAMP'];
  key: string;
  type: string;

  constructor(key: string, type: string) {
    this.key = key;
    this.type = type;
  }
}
