import { Component } from '@angular/core';

@Component({
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {
  filter: any;

  constructor() {
    this.filter = {
      place: '',
      trainer: '',
      client: ''
    };
  }
}
