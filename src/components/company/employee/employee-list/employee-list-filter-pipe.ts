import { Pipe, PipeTransform } from '@angular/core';

import { IEmployee } from 'app/services/employee/employee';


@Pipe({
  name: 'filterEmployees',
  pure: false
})
export class EmployeeListFilterPipe implements PipeTransform {
  transform(list: IEmployee[], filter?: any, limit?: any): IEmployee[] {
    if (!list) {
      return list;
    }

    if (filter) {
      let shownSessions = 0;
      let queryText = filter.toLowerCase().replace(/,|\.|-/g,' ');
      let queryWords = queryText.split(' ').filter(w => w.trim().length);

      list.forEach(item => {
        item.hide = false;
        let matchesQueryText = false;

        if (queryWords.length) {
          // of any query word is in the item name or lastname than it passes the query test
          queryWords.forEach(queryWord => {
            if (item.name.toLowerCase().indexOf(queryWord) > -1) {
              matchesQueryText = true;
            }
          });
        } else {
          matchesQueryText = true;
        }

        if (!matchesQueryText) {
          item.hide = true;
        } else {
          shownSessions++;
        }
      });
    }

    return list.slice(0, limit);
  }
}
