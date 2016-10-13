import { ChangeDetectionStrategy, Component, Input, Pipe } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { WorkoutItem } from '../workout-item/workout-item';
import { WorkoutListGroupPipe } from './workout-list-group-pipe';
import { WorkoutListFilterPipe } from './workout-list-filter-pipe';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [WorkoutItem],
  pipes: [
    WorkoutListGroupPipe,
    WorkoutListFilterPipe
  ],
  selector: 'workout-list',
  templateUrl: 'workout-list.html'
})
export class WorkoutList {
  @Input() workouts: ReplaySubject<List<any>>;

  filter: string;

  constructor() {
    // this.filter = params.get('filter');
  }
  onChanges(inputChanges) {
    // console.log('test onchange', inputChanges);
  }

  showMonth(monthId) {
    $('.workouts-hidden.month-' + monthId).slideToggle();
  }
}
