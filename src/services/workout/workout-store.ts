import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IWorkout, Workout } from './workout';
import { WorkoutService } from './workout-service';

import { WorkoutGroupStore } from 'app/services/workout-group/workout-group-store';

@Injectable()
export class WorkoutStore extends BaseStore {
  constructor(
    private workoutService: WorkoutService,
    private baseStream: BaseStream,
    private workoutGroupStore: WorkoutGroupStore
  ) {
    super(workoutService, baseStream);
    this.model = 'Workout';
    this.init();

    this.workoutGroupStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.groups = this.workoutGroupStore.filterBy({ workoutId: item.id });
    return item;
  }
}
