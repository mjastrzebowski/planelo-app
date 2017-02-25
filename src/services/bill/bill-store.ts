import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IBill, Bill } from './bill';

import { FIREBASE_BILLS_URL } from 'app/config';

@Injectable()
export class BillStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public bills: FirebaseListObservable<IBill[]>;
  public list: List<any> = List();

  constructor(
    private af: AngularFire
  ) {
    this.bills = this.af.database.list('cal_bills', {
      query: {
        orderByChild: 'month'
      }
    });
    this.bills.subscribe(list => {
      this.list = List(list);
      this.list.forEach(item => {
        item.key = item.$key;
        item.clientKey = item.client;
      });

      this.loaded = true;
      this.emit();
    });
  }

  createBill(client: string, month: string, discount?: number) {
    return this.bills.push(new Bill(client, month, discount || 0));
  }

  removeBill(bill: IBill) {
    return this.bills.remove(bill.key);
  }

  updateBill(bill: IBill, changes: any) {
    return this.bills.update(bill.key, changes);
  }

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.loaded);
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
