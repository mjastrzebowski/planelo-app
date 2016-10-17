import { Component, Input } from '@angular/core';

import { IBill } from '../../../core/bill/bill';
import { BillService } from '../../../core/bill/bill-service';

import { ClientStore } from '../../../core/client/client-store';


@Component({
  selector: 'bill-item',
  templateUrl: 'bill-item.html'
})
export class BillItem {
  @Input() model: IBill;

  constructor(
    private billService: BillService,
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
    this.billService.deleteBill(this.model);
  }
}
