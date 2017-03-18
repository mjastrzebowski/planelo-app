import { Pipe, PipeTransform } from '@angular/core';

import { IRoutine } from 'app/services/routine/routine';


@Pipe({
  name: 'filterRoutines',
  pure: false
})
export class RoutineListFilterPipe implements PipeTransform {
  transform(list: IRoutine[], filter?: any, limit?: any): IRoutine[] {
    if (!list) {
      return list;
    }

    if (filter) {
      let shownSessions = 0;
      let queryText = filter.query.toLowerCase().replace(/,|\.|-/g,' ');
      let queryWords = queryText.split(' ').filter(w => w.trim().length);

      list.forEach(routine => {
        routine.hide = false;
        let matchesQueryText = false;

        if (queryWords.length) {
          // of any query word is in the routine name or lastname than it passes the query test
          queryWords.forEach(queryWord => {
            if (routine.name.toLowerCase().indexOf(queryWord) > -1) {
              matchesQueryText = true;
            }
          });
        } else {
          matchesQueryText = true;
        }

        if (!matchesQueryText) {
          routine.hide = true;
        } else {
          shownSessions++;
        }
      });
    }

    return list.slice(0, limit);
  }
}
