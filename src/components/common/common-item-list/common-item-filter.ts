import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCommonItems',
  pure: false
})
export class CommonItemFilterPipe implements PipeTransform {
  transform(list: any[], filter?: any, limit?: any): any[] {
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
    } else {
      list.forEach(item => {
        item.hide = false;
      });
    }

    return list.slice(0, limit);
  }
}
