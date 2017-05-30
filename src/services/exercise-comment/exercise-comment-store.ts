import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IExerciseComment, ExerciseComment } from './exercise-comment';
import { ExerciseCommentService } from './exercise-comment-service';

@Injectable()
export class ExerciseCommentStore extends BaseStore {
  constructor(
    private exerciseCommentService: ExerciseCommentService,
    private baseStream: BaseStream
  ) {
    super(exerciseCommentService, baseStream);
    this.model = 'ExerciseComment';
    this.init();
  }
}
