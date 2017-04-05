import { Pipe, PipeTransform } from '@angular/core';

import { ICompany } from 'app/services/company/company';


@Pipe({
  name: 'filterCompanies',
  pure: false
})
export class CompanyListFilterPipe implements PipeTransform {
  transform(list: ICompany[], filter?: any, limit?: any): ICompany[] {
    if (!list) {
      return list;
    }

    if (filter) {
      let shownSessions = 0;
      let queryText = filter.query.toLowerCase().replace(/,|\.|-/g,' ');
      let queryWords = queryText.split(' ').filter(w => w.trim().length);

      list.forEach(company => {
        company.hide = false;
        let matchesQueryText = false;

        if (queryWords.length) {
          // of any query word is in the company name or lastname than it passes the query test
          queryWords.forEach(queryWord => {
            if (company.name.toLowerCase().indexOf(queryWord) > -1) {
              matchesQueryText = true;
            }
          });
        } else {
          matchesQueryText = true;
        }

        if (!matchesQueryText) {
          company.hide = true;
        } else {
          shownSessions++;
        }
      });
    }

    return list.slice(0, limit);
  }
}
