import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IWorkoutGroupType, WorkoutGroupType } from './workout-group-type';
import { WorkoutGroupTypeService } from './workout-group-type-service';

@Injectable()
export class WorkoutGroupTypeStore extends BaseStore {
  constructor(
    private workoutGroupTypeService: WorkoutGroupTypeService,
    private baseStream: BaseStream
  ) {
    super(workoutGroupTypeService, baseStream);
    this.model = 'WorkoutGroupType';
    this.init();
  }
}
