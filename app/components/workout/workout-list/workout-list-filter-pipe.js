import { Pipe, PipeTransform } from '@angular/core';

import { IWorkout } from '../../../core/workout/workout';


@Pipe({
  name: 'filterWorkouts',
  pure: true
})
export class WorkoutListFilterPipe implements PipeTransform {
  transform(list: IWorkout[], filterType?: string[]): IWorkout[] {
    if (list) {
      return list.slice().reverse();
    }
  }
}
