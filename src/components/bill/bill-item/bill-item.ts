import { Component, Input } from '@angular/core';

import { IBill } from '../../../core/bill/bill';
import { BillStore } from '../../../core/bill/bill-store';

import { ClientStore } from '../../../core/client/client-store';


@Component({
  selector: 'bill-item',
  templateUrl: 'bill-item.html'
})
export class BillItem {
  @Input() model: IBill;

  constructor(
    private billStore: BillStore,
    public clientStore: ClientStore,
  ) {}

  ngAfterContentChecked(): void {
    let created = moment(this.model.createdAt);
    this.model.fromNow = created.fromNow();
    this.model.descDate = created.format('DD.MM.YYYY, HH:mm');

    moment.locale('pl');
    let month = moment(this.model.month);
    this.model.descMonth = month.format('MMMM');
  }

  delete(): void {
    this.billStore.removeBill(this.model);
  }
}
