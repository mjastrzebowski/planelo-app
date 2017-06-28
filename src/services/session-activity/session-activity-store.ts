import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { ISessionActivity, SessionActivity } from './session-activity';
import { SessionActivityService } from './session-activity-service';

import { ActivityStore } from 'app/services/activity/activity-store';

@Injectable()
export class SessionActivityStore extends BaseStore {
  constructor(
    private sessionActivityService: SessionActivityService,
    private baseStream: BaseStream,
    private activityStore: ActivityStore
  ) {
    super(sessionActivityService, baseStream);
    this.model = 'SessionActivity';
    this.init();

    this.activityStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.activity = this.activityStore.getItem(item.activityId);
    return item;
  }
}
