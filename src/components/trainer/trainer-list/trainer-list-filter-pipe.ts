import { Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';

import { ITrainer } from 'app/core/trainer/trainer';


@Pipe({
  name: 'filterTrainers',
  pure: false
})
export class TrainerListFilterPipe implements PipeTransform {
  transform(list: ITrainer[], filter?: any, limit?: any): ITrainer[] {
    if (!list) {
      return list;
    }

    let shownSessions = 0;
    let queryText = filter.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter(w => w.trim().length);

    list.forEach(trainer => {
      trainer.hide = false;
      let matchesQueryText = false;

      if (queryWords.length) {
        // of any query word is in the trainer name or lastname than it passes the query test
        queryWords.forEach(queryWord => {
          if (trainer.name.toLowerCase().indexOf(queryWord) > -1 || trainer.lastname.toLowerCase().indexOf(queryWord) > -1 || (trainer.alias && trainer.alias.toLowerCase().indexOf(queryWord) > -1)) {
            matchesQueryText = true;
          }
        });
      } else {
        // if there are no query words then this trainer passes the query test
        matchesQueryText = true;
      }

      if (!matchesQueryText) {
        trainer.hide = true;
      } else {
        shownSessions++;
      }
    });

    return list.slice(0, limit);
  }
}
