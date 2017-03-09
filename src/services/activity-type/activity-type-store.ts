import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IActivityType, ActivityType } from './activity-type';
import { ActivityTypeService } from './activity-type-service';

@Injectable()
export class ActivityTypeStore extends BaseStore {
  constructor(
    private activityTypeService: ActivityTypeService,
    private baseStream: BaseStream
  ) {
    super(activityTypeService, baseStream);
    this.model = 'ActivityType';
    this.init();
  }
}
