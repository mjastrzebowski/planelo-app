import { Pipe, PipeTransform } from '@angular/core';

import { IProfileSession } from 'app/services/profile-session/profile-session';


@Pipe({
  name: 'filterWorkouts',
  pure: true
})
export class WorkoutListFilterPipe implements PipeTransform {
  transform(list: IProfileSession[], filterType?: string[]): IProfileSession[] {
    if (list) {
      return list.slice().reverse();
    }
  }
}
