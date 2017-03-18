import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IWorkoutSet, WorkoutSet } from './workout-set';
import { WorkoutSetService } from './workout-set-service';

@Injectable()
export class WorkoutSetStore extends BaseStore {
  constructor(
    private workoutSetService: WorkoutSetService,
    private baseStream: BaseStream
  ) {
    super(workoutSetService, baseStream);
    this.model = 'WorkoutSet';
    this.init();
  }
}
