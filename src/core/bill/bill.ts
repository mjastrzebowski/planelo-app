export class IBill {
  completed: boolean;
  createdAt: number;
  key?: string;
  client: any;
  clientKey?: string;
  month: string;
  payed?: number;
  trainingsTodoCount?: number;
  trainingsMovedCount?: number;
  trainingsSurcharge?: number;
  discount?: number;
  discountAmount?: number;
  surcharge?: number;
  surchargeDesc?: string;
  subtotal?: number;
  total?: number;
  workout?: any;
  fromNow?: any;
  descDate?: any;
  descMonth?: any;
}

export class Bill implements IBill {
  completed: boolean = false;
  createdAt: number = firebase.database['ServerValue']['TIMESTAMP'];
  client: string;
  month: string;
  discount: number;

  constructor(
    client: string,
    month: string,
    discount: number) {
    this.client = client;
    this.month = month;
    this.discount = discount;
  }
}
