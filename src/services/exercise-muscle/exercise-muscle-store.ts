import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExerciseMuscle, ExerciseMuscle } from './exercise-muscle';
import { ExerciseMuscleService } from './exercise-muscle-service';

import { MuscleStore } from 'app/services/muscle/muscle-store';

@Injectable()
export class ExerciseMuscleStore extends BaseStore {
  constructor(
    private exerciseMuscleService: ExerciseMuscleService,
    private baseStream: BaseStream,
    private muscleStore: MuscleStore
  ) {
    super(exerciseMuscleService, baseStream);
    this.model = 'ExerciseMuscle';
    this.init();

    this.muscleStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.muscle = this.muscleStore.getItem(item.muscleId);
    return item;
  }
}
