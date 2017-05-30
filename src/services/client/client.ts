export class IClient {
  createdAt?: number;
  id: number;
  key?: string;
  hide?: boolean;
  active?: boolean;
  name?: string;
  companyId: number;

  email?: string;
  phone?: string;
  comment?: string;
  lastname?: string;
  username?: string;
  password?: string;
  gender?: any;
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
  id: number;
  companyId: number;

  constructor(companyId: number) {
    this.companyId = companyId;
  }
}
