import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IActivity, Activity } from './activity';
import { ActivityService } from './activity-service';

import { ActivityTypeStore } from 'app/services/activity-type/activity-type-store';

@Injectable()
export class ActivityStore extends BaseStore {
  constructor(
    private activityService: ActivityService,
    private baseStream: BaseStream,
    private activityTypeStore: ActivityTypeStore
  ) {
    super(activityService, baseStream);
    this.model = 'Activity';
    this.init();

    this.activityTypeStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item.activityType = this.activityTypeStore.getItem(item.activityTypeId);
    return item;
  }
}
