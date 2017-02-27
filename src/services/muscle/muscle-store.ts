import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IMuscle, Muscle } from './muscle';
import { MuscleService } from './muscle-service';

@Injectable()
export class MuscleStore extends BaseStore {
  constructor(
    private muscleService: MuscleService,
    private baseStream: BaseStream
  ) {
    super(muscleService, baseStream);
    this.model = 'Muscle';
    this.init();
  }
}
