import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IRoutineDay, RoutineDay } from './routine-day';
import { RoutineDayService } from './routine-day-service';

import { RoutineDayWorkoutStore } from 'app/services/routine-day-workout/routine-day-workout-store';

@Injectable()
export class RoutineDayStore extends BaseStore {
  constructor(
    private routineDayService: RoutineDayService,
    private baseStream: BaseStream,
    private routineDayWorkoutStore: RoutineDayWorkoutStore
  ) {
    super(routineDayService, baseStream);
    this.model = 'RoutineDay';
    this.init();

    this.routineDayWorkoutStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.workouts = this.routineDayWorkoutStore.filterBy({ routineDayId: item.id });
    return item;
  }
}
