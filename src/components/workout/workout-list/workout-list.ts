import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'workout-list',
  templateUrl: 'workout-list.html'
})
export class WorkoutList {
  @Input() workouts: ReplaySubject<List<any>>;
  filter: string;

  constructor() {}

  showMonth(monthId): void {
    $('.workouts-hidden.month-' + monthId).slideToggle();
  }
}
