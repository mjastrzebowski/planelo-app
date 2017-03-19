import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IRoutineDayWorkout, RoutineDayWorkout } from './routine-day-workout';
import { RoutineDayWorkoutService } from './routine-day-workout-service';

import { WorkoutStore } from 'app/services/workout/workout-store';

@Injectable()
export class RoutineDayWorkoutStore extends BaseStore {
  constructor(
    private routineDayWorkoutService: RoutineDayWorkoutService,
    private baseStream: BaseStream,
    private workoutStore: WorkoutStore
  ) {
    super(routineDayWorkoutService, baseStream);
    this.model = 'RoutineDayWorkout';
    this.init();

    this.workoutStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.workout = this.workoutStore.getItem(item.workoutId);
    return item;
  }
}
