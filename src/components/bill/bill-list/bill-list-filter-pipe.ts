import { Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';

import { IBill } from 'app/core/bill/bill';


@Pipe({
  name: 'filterBills',
  pure: false
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

  filter(list, key, value): IBill[] {
    if (!value) {
      return list;
    }
    return list.filter((bill: IBill) => {
      return bill[key] === value || (bill.workout && bill.workout[key] === value) || (bill.client && bill.client.key === value);
    });
  }
}
