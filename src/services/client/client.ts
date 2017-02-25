export class IClient {
  completed: boolean;
  createdAt: number;
  id?: number;
  key?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  comment: string;
  username?: string;
  password?: string;
  gender?: any;
  hide?: boolean;

  delete?: boolean;
  message?: any;
  surcharge?: any;
  surchargeDesc?: any;
  month?: any;
  total?: any;
  payed?: any;
  discount?: any;
  discountAmount?: any;
  trainingsTodoCount?: any;
  trainingsDone?: any;
  trainingsDoneLast?: any;
  trainingsTodo?: any;
  trainingsTodoNext?: any;
  trainingsScheduled?: any;
  trainingsDoneCount?: any;
  trainingsMovedCount?: any;
  trainingsSurcharge?: any;
  billSent?: any;
  billSendStatus?: any;
  billSendError?: any;
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
