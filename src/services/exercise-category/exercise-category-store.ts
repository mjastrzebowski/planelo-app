import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExerciseCategory, ExerciseCategory } from './exercise-category';
import { ExerciseCategoryService } from './exercise-category-service';

@Injectable()
export class ExerciseCategoryStore extends BaseStore {
  constructor(
    private exerciseCategoryService: ExerciseCategoryService,
    private baseStream: BaseStream
  ) {
    super(exerciseCategoryService, baseStream);
    this.model = 'ExerciseCategory';
    this.init();
  }
}
