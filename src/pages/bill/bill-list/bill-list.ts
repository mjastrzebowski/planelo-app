import { Component } from '@angular/core';

import { Utils } from '../../../providers/utils';
import { AuthService } from '../../../core/auth/auth-service';

import { NotificationCounter } from '../../../components/notification/notification-counter/notification-counter';

import { BillStore } from '../../../core/bill/bill-store';

import { BillList } from '../../../components/bill/bill-list/bill-list';
import { BillFilter } from '../../../components/bill/bill-filter/bill-filter';


@Component({
  templateUrl: 'bill-list.html',
  directives: [
    NotificationCounter,
    BillList,
    BillFilter
  ]
})
export class BillListPage {

  constructor(public utils: Utils, public auth: AuthService, public billStore: BillStore) {

    this.filter = {
      place: '',
      client: '',
      month: '2016-09'
    };
  }
}
