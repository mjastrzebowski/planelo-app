import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouteParams } from '@angular/router';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// import { WorkoutItem } from '../workout-item/workout-item';
// import { WorkoutListFilterPipe } from './workout-list-filter-pipe';

// const styles: string = require('./workout-list.scss');
// const template: string = require('./workout-list.html');


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'workout-list',
  templateUrl: 'build/components/workout/workout-list/workout-list.html'
})

export class WorkoutList {
  @Input() workouts: ReplaySubject<List<any>>;

  filter: string;

  constructor() {
    // this.filter = params.get('filter');
  }
  onChanges(inputChanges) {
    console.log('test onchange', inputChanges);
  }
}
