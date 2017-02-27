import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExercise, Exercise } from './exercise';
import { ExerciseService } from './exercise-service';

@Injectable()
export class ExerciseStore extends BaseStore {
  constructor(
    private exerciseService: ExerciseService,
    private baseStream: BaseStream
  ) {
    super(exerciseService, baseStream);
    this.model = 'Exercise';
    this.init();
  }
}
