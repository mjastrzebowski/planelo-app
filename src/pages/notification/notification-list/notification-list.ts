import { Component } from '@angular/core';

import { Utils } from '../../../providers/utils';
import { AuthService } from '../../../core/auth/auth-service';

import { NotificationCounter } from '../../../components/notification/notification-counter/notification-counter';

import { NotificationStore } from '../../../core/notification/notification-store';

import { NotificationList } from '../../../components/notification/notification-list/notification-list';
import { NotificationFilter } from '../../../components/notification/notification-filter/notification-filter';


@Component({
  templateUrl: 'notification-list.html',
  directives: [
    NotificationCounter,
    NotificationList,
    NotificationFilter
  ]
})
export class NotificationListPage {

  constructor(public utils: Utils, public auth: AuthService, public notificationStore: NotificationStore) {

    this.filter = {
      place: '',
      trainer: '',
      client: ''
    };
  }
}
