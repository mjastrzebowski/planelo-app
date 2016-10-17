import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { IBill } from './bill';

export class BillStore {
  bills: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(
    private ref: Firebase,
    private auth: AuthService
  ) {
    ref = ref.orderByChild('month');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): IBill {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  public getItemByClientMonth(client: string, month: string): IBill {
    let index = this.findIndexByClientMonth(client, month);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  private updateBillDependencies(bill: IBill): void {
    // let dateArray = bill.month.split('-');
    // let year = dateArray[0];
    // let monthStr = dateArray[1];
    // let month = parseInt(monthStr, 10) - 1;

    // bill.fullDate = new Date(year, month);

    // moment.locale('pl');
    // bill.weekDay = moment(bill.fullDate).format('dddd');
    // if (!bill.weekDay || bill.weekDay == 'Invalid Date' || bill.weekDay == 'Invalid date') {
    //   bill.weekDay = bill.fullDate.toLocaleDateString('pl', { weekday: 'long' });
    // }
    // bill.descDate = bill.weekDay + ', ' + date + '.' + monthStr + '.' + year + ' r.';

    bill.clientKey = bill.client;
  }

  private emit(): void {
    this.bills.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let val = snapshot.val();
      let bill: IBill = val;
      bill.key = key;
      this.list = this.list.push(bill);
      this.updateBillDependencies(bill);
      this.emit();
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let bill: IBill = snapshot.val();
      bill.key = key;
      this.list = this.list.set(index, bill);
      this.updateBillDependencies(bill);
      this.emit();
    }
  }

  private findIndex(key: string): number {
    return this.list.findIndex((bill: IBill) => {
      return bill.key === key;
    });
  }

  private findIndexByClientMonth(client: string, month: string): number {
    return this.list.findIndex((bill: IBill) => {
      return bill.client === client && bill.month === month;
    });
  }
}
