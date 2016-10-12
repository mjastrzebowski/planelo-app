import { Pipe, PipeTransform } from '@angular/core';

import { IWorkout } from '../../../core/workout/workout';


@Pipe({
  name: 'groupWorkouts',
  pure: true
})
export class WorkoutListGroupPipe implements PipeTransform {
  transform(list: IWorkout[], filterType?: string[]): IWorkout[] {
    if (list) {
      let lastMonth = null;
      moment.locale('pl');
      list.forEach((workout) => {
        workout.monthId = moment(workout.date).format('YYYYMM');
        if (lastMonth !== workout.monthId) {
          lastMonth = workout.monthId;
          workout.nextMonth = true;
          workout.month = moment(workout.date).format('MMMM').toUpperCase();
        }
      });
      return list;
    }
  }
}
