export class IClient {
  completed: boolean;
  createdAt: number;
  key?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  comment: string;
  username?: string;
}

export class Client implements IClient {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  name: string;
  lastname: string;
  email: string = '';
  phone: string = '';
  comment: string = '';

  constructor(name: string, lastname: string, email: string, phone: string, comment: string) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.comment = comment;
  }
}
