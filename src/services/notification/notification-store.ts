import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { INotification, Notification } from './notification';
import { NotificationService } from './notification-service';

@Injectable()
export class NotificationStore extends BaseStore {
  constructor(
    private notificationService: NotificationService,
    private baseStream: BaseStream
  ) {
    super(notificationService, baseStream);
    this.model = 'Notification';
    this.init();
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.workout = JSON.parse(item.workout);
    return item;
  }

  public count(timer: number): number {
    if (!timer) {
      return this.size;
    }
    let filtered = this.list.filter(item => {
      return item.createdAt > timer;
    });
    return filtered.size;
  }
}
