import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IWorkoutGroup, WorkoutGroup } from './workout-group';
import { WorkoutGroupService } from './workout-group-service';

import { WorkoutGroupTypeStore } from 'app/services/workout-group-type/workout-group-type-store';
import { WorkoutExerciseStore } from 'app/services/workout-exercise/workout-exercise-store';

@Injectable()
export class WorkoutGroupStore extends BaseStore {
  constructor(
    private workoutGroupService: WorkoutGroupService,
    private baseStream: BaseStream,
    private workoutGroupTypeStore: WorkoutGroupTypeStore,
    private workoutExerciseStore: WorkoutExerciseStore
  ) {
    super(workoutGroupService, baseStream);
    this.model = 'WorkoutGroup';
    this.init();

    this.workoutGroupTypeStore.subscribe(this.refresh.bind(this));
    this.workoutExerciseStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.type = this.workoutGroupTypeStore.getItem(item.workoutGroupTypeId);
    item.exercises = this.workoutExerciseStore.filterBy({ workoutGroupId: item.id });
    return item;
  }
}
