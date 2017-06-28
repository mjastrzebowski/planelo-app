import { Pipe, PipeTransform } from '@angular/core';

import { ISession } from 'app/services/session/session';


@Pipe({
  name: 'filterWorkouts',
  pure: true
})
export class WorkoutListFilterPipe implements PipeTransform {
  transform(list: ISession[], filterType?: string[]): ISession[] {
    if (list) {
      return list.slice().reverse();
    }
  }
}
