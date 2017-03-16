import { Pipe, PipeTransform } from '@angular/core';

import { IExercise } from 'app/services/exercise/exercise';


@Pipe({
  name: 'filterExercises',
  pure: false
})
export class ExerciseListFilterPipe implements PipeTransform {
  transform(list: IExercise[], filter?: any, limit?: any): IExercise[] {
    if (!list) {
      return list;
    }

    if (filter) {
      let shownSessions = 0;
      let queryCategory = filter.category;
      let queryText = filter.query.toLowerCase().replace(/,|\.|-/g,' ');
      let queryWords = queryText.split(' ').filter(w => w.trim().length);

      list.forEach(exercise => {
        exercise.hide = false;
        let matchesQueryText = false;

        if (queryWords.length) {
          // of any query word is in the exercise name or lastname than it passes the query test
          queryWords.forEach(queryWord => {
            if (exercise.name.toLowerCase().indexOf(queryWord) > -1) {
              matchesQueryText = true;
            }
          });
        } else if (queryCategory) {
          if (exercise.categoryId === queryCategory) {
            matchesQueryText = true;
          }
        } else {
          matchesQueryText = true;
        }

        if (!matchesQueryText) {
          exercise.hide = true;
        } else {
          shownSessions++;
        }
      });
    }

    return list.slice(0, limit);
  }
}