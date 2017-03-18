import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IWorkoutExercise, WorkoutExercise } from './workout-exercise';
import { WorkoutExerciseService } from './workout-exercise-service';

import { ExerciseStore } from 'app/services/exercise/exercise-store';
import { WorkoutSetStore } from 'app/services/workout-set/workout-set-store';

@Injectable()
export class WorkoutExerciseStore extends BaseStore {
  constructor(
    private workoutExerciseService: WorkoutExerciseService,
    private baseStream: BaseStream,
    private exerciseStore: ExerciseStore,
    private workoutSetStore: WorkoutSetStore
  ) {
    super(workoutExerciseService, baseStream);
    this.model = 'WorkoutExercise';
    this.init();

    this.exerciseStore.subscribe(this.refresh.bind(this));
    this.workoutSetStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.exercise = this.exerciseStore.getItem(item.exerciseId);
    item.sets = this.workoutSetStore.filterBy({ workoutExerciseId: item.id });
    return item;
  }
}
