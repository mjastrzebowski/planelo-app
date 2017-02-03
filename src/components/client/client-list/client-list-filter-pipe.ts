import { Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';

import { IClient } from '../../../core/client/client';


@Pipe({
  name: 'filterClients',
  pure: false
})
export class ClientListFilterPipe implements PipeTransform {
  transform(list: IClient[], filter?: any, limit?: any): IClient[] {
    if (!list) {
      return list;
    }

    let shownSessions = 0;
    let queryText = filter.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter(w => w.trim().length);

    list.forEach(client => {
      client.hide = false;
      let matchesQueryText = false;

      if (queryWords.length) {
        // of any query word is in the client name or lastname than it passes the query test
        queryWords.forEach(queryWord => {
          if (client.name.toLowerCase().indexOf(queryWord) > -1 || client.lastname.toLowerCase().indexOf(queryWord) > -1) {
            matchesQueryText = true;
          }
        });
      } else {
        // if there are no query words then this client passes the query test
        matchesQueryText = true;
      }

      if (!matchesQueryText) {
        client.hide = true;
      } else {
        shownSessions++;
      }
    });

    return list.slice(0, limit);
  }
}
