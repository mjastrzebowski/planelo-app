import { Component, Input, ViewChildren } from '@angular/core';

import { BillStore } from '../../../core/bill/bill-store';


@Component({
  selector: 'bill-list',
  templateUrl: 'bill-list.html'
})
export class BillList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('bills') bills: any;

  constructor(
    public billStore: BillStore
  ) {
    this.isMore = false;
    this.bills = [];
  }

  ngOnInit(): void {
    if (!this.limit) {
      this.isMore = true;
      this.limit = 100;
    }
    this.baseLimit = this.limit;
  }

  showMore(): void {
    this.limit += 100;
    if (this.bills.length % this.baseLimit !== 0) {
      this.isMore = false;
    }
  }
}
