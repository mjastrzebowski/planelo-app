import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExerciseImage, ExerciseImage } from './exercise-image';
import { ExerciseImageService } from './exercise-image-service';

@Injectable()
export class ExerciseImageStore extends BaseStore {
  constructor(
    private exerciseImageService: ExerciseImageService,
    private baseStream: BaseStream
  ) {
    super(exerciseImageService, baseStream);
    this.model = 'ExerciseImage';
    this.init();
  }
}
