import { Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';

import { IBill } from '../../../core/bill/bill';


@Pipe({
  name: 'filterBills',
  pure: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillListFilterPipe implements PipeTransform {
  transform(list: IBill[], filter?: any, limit?: any): IBill[] {
    if (!list) {
      return list;
    }

    if (filter) {
      list = this.filter(list, 'month', filter.month);
      // list = this.filter(list, 'place', filter.place);
      list = this.filter(list, 'client', filter.client);
    }

    return list.slice().reverse().slice(0, limit);
  }

  filter(list, key, value) {
    if (!value) {
      return list;
    }
    return list.filter((bill: IBill) => {
      return bill[key] === value || (bill.workout && bill.workout[key] === value) || (bill.client && bill.client.key === value);
    });
  }
}
