import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExercise, Exercise } from './exercise';
import { ExerciseService } from './exercise-service';

import { MuscleStore } from 'app/services/muscle/muscle-store';

@Injectable()
export class ExerciseStore extends BaseStore {
  constructor(
    private exerciseService: ExerciseService,
    private baseStream: BaseStream,
    private muscleStore: MuscleStore
  ) {
    super(exerciseService, baseStream);
    this.model = 'Exercise';
    this.init();
  }

  convertItem(item: any) {
    console.log('a', item.muscles);
    item.muscles = this.muscleStore.filterBy({ exerciseId: item.id });
    console.log('b', item.muscles);
    return item;
  }

  // create(item: any) {
  //   return this.service.create(item).then((data) => {
  //     this.muscleStore.create(data.id
  //   });
  // }
}
