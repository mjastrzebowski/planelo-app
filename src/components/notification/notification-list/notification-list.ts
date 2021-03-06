import { Component, Input, ViewChildren } from '@angular/core';

import { NotificationStore } from 'app/services/notification/notification-store';

@Component({
  selector: 'notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('notifications') notifications: any;
  isMore: boolean;
  baseLimit: number;

  constructor(
    public notificationStore: NotificationStore
  ) {
    this.isMore = false;
    this.notifications = [];
  }

  ngOnInit(): void {
    if (!this.limit) {
      this.isMore = true;
      this.limit = 100;
    }
    this.baseLimit = this.limit;
  }

  showMore(): void {
    this.limit += 100;
    if (this.notifications.length % this.baseLimit !== 0) {
      this.isMore = false;
    }
  }
}
