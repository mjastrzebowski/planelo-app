export interface IUser {
  completed: boolean;
  createdAt: number;
  id?: string;
  key: string;
  type: string;
}


export class User implements IUser {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  key: string;
  type: string;

  constructor(id: string, key: string, type: string) {
    this.key = key;
    this.type = type;
  }
}
