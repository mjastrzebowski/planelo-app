import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from 'app/core/auth/auth-service';

@Component({
  selector: 'workout-list',
  templateUrl: 'workout-list.html'
})
export class WorkoutList {
  @Input() workouts: ReplaySubject<List<any>>;
  @Input() changeDate: any;
  filter: string;

  constructor(public auth: AuthService) {}

  showMonth(monthId): void {
    $('.workouts-hidden.month-' + monthId).slideToggle();
  }
}
