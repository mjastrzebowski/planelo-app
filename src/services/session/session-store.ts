import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { ISession, Session } from './session';
import { SessionService } from './session-service';

import { ActivityStore } from 'app/services/activity/activity-store';

@Injectable()
export class SessionStore extends BaseStore {
  constructor(
    private sessionService: SessionService,
    private baseStream: BaseStream,
    private activityStore: ActivityStore
  ) {
    super(sessionService, baseStream);
    this.model = 'Session';
    this.init();

    this.activityStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.activity = this.activityStore.getItem(item.activityId);
    return item;
  }
}
