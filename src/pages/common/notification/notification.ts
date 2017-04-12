import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  name: 'notification',
  segment: 'notification'
})
@Component({
  templateUrl: 'notification.html'
})
export class NotificationPage {
  filter: any;

  constructor() {
    this.filter = {
      place: '',
      trainer: '',
      client: ''
    };
  }
}
