import { IBill, Bill } from './bill';

export class BillService {
  constructor(private ref: Firebase) {}

  createBill(client: string, month: string, discount: number) {
    return this.ref.push(new Bill(client, month, discount || 0), (error: Error) => {
      if (error) {
        console.error('ERROR @ createBill :', error);
      }
    });
  }

  deleteBill(bill: IBill): void {
    this.ref.child(bill.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteBill :', error);
      }
    });
  }

  updateBill(bill: IBill, changes: any): void {
    this.ref.child(bill.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateBill :', error);
      }
    });
  }
}
