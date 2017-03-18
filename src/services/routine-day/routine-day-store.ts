import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IRoutineDay, RoutineDay } from './routine-day';
import { RoutineDayService } from './routine-day-service';

import { WorkoutStore } from 'app/services/workout/workout-store';

@Injectable()
export class RoutineDayStore extends BaseStore {
  constructor(
    private routineDayService: RoutineDayService,
    private baseStream: BaseStream,
    private workoutStore: WorkoutStore
  ) {
    super(routineDayService, baseStream);
    this.model = 'RoutineDay';
    this.init();

    this.workoutStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.workouts = this.workoutStore.filterBy({ routineDayId: item.id });
    return item;
  }
}
