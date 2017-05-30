// import { Injectable } from '@angular/core';
// import { AngularFire } from 'angularfire2';

// import { IBill, Bill } from './bill';

// @Injectable()
// export class BillService {
//   ref?: any;

//   constructor(private af: AngularFire) {}

//   createBill(client: string, month: string, discount: number) {
//     return this.ref.push(new Bill(client, month, discount || 0), (error: Error) => {
//       if (error) {
//         console.error('ERROR @ createBill :', error);
//       }
//     });
//   }

//   deleteBill(bill: IBill): void {
//     this.ref.child(bill.key).remove((error: Error) => {
//       if (error) {
//         console.error('ERROR @ deleteBill :', error);
//       }
//     });
//   }

//   updateBill(bill: IBill, changes: any): void {
//     this.ref.child(bill.key).update(changes, (error: Error) => {
//       if (error) {
//         console.error('ERROR @ updateBill :', error);
//       }
//     });
//   }
// }
