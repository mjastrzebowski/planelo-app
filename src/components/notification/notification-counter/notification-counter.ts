import { Component } from '@angular/core';

import { AuthService } from 'app/services/auth/auth-service';

import { NotificationStore } from 'app/services/notification/notification-store';


@Component({
  selector: 'notification-counter',
  templateUrl: 'notification-counter.html'
})
export class NotificationCounter {
  private timer;

  constructor(
    public auth: AuthService,
    public notificationStore: NotificationStore
  ) {
    this.timer = localStorage.getItem('notification-counter-timer') || 0;
  }

  clear() {
    let now = new Date();
    localStorage.setItem('notification-counter-read', this.timer || 0);
    this.timer = now.getTime();
    localStorage.setItem('notification-counter-timer', this.timer);
  }
}
