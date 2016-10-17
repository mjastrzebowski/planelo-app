import { Component } from '@angular/core';

@Component({
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {

  constructor() {
    this.filter = {
      place: '',
      trainer: '',
      client: ''
    };
  }
}
