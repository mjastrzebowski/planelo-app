import { Component, Input, ViewChildren } from '@angular/core';

import { NotificationStore } from '../../../core/notification/notification-store';

import { NotificationItem } from '../notification-item/notification-item';
import { NotificationListFilterPipe } from './notification-list-filter-pipe';


@Component({
  directives: [
    NotificationItem
  ],
  pipes: [
    NotificationListFilterPipe
  ],
  selector: 'notification-list',
  templateUrl: 'build/components/notification/notification-list/notification-list.html'
})
export class NotificationList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('notifications') notifications: any;

  constructor(public notificationStore: NotificationStore) {
    this.isMore = false;
    this.notifications = [];
  }

  ngOnInit() {
    if (!this.limit) {
      this.isMore = true;
      this.limit = 100;
    }
    this.baseLimit = this.limit;
  }

  showMore() {
    this.limit += 100;
    if (this.notifications.length % this.baseLimit !== 0) {
      this.isMore = false;
    }
  }
}
