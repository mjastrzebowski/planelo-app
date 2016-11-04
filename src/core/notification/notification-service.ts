import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { INotification, Notification } from './notification';

@Injectable()
export class NotificationService {
  constructor(private af: AngularFire) {}

  createNotification(type: string, data: any) {
    return this.ref.push(new Notification(type, data), (error: Error) => {
      if (error) {
        console.error('ERROR @ createNotification :', error);
      }
    });
  }

  deleteNotification(notification: INotification): void {
    this.ref.child(notification.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteNotification :', error);
      }
    });
  }

  updateNotification(notification: INotification, changes: any): void {
    this.ref.child(notification.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateNotification :', error);
      }
    });
  }
}
