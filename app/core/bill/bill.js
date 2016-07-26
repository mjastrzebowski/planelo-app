export interface IBill {
  completed: boolean;
  createdAt: number;
  key?: string;
  client: string;
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
}

export class Bill implements IBill {
  completed: boolean = false;
  createdAt: number = Firebase.ServerValue.TIMESTAMP;
  client: string;
  month: string;

  constructor(
    client: string,
    month: string) {
    this.client = client;
    this.month = month;
  }
}
