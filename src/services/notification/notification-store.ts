import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from 'app/services/auth/auth-service';

import { INotification, Notification } from './notification';

@Injectable()
export class NotificationStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private notifications: FirebaseListObservable<INotification[]>;
  public list: List<any> = List();

  constructor(
    private af: AngularFire,
    private auth: AuthService
  ) {
    this.notifications = this.af.database.list('cal_notifications', {
      query: {
        orderByChild: 'createdAt'
      }
    });
    this.notifications.subscribe(list => {
      this.list = List(list);
      this.list.forEach(item => {
        item.key = item.$key;
      });

      this.loaded = true;
      this.emit();
    });
  }

  createNotification(type: string, data: any) {
    return this.notifications.push(new Notification(type, data));
  }

  removeNotification(notification: INotification) {
    return this.notifications.remove(notification.key);
  }

  updateNotification(notification: INotification, changes: any) {
    return this.notifications.update(notification.key, changes);
  }

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.loaded);
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): INotification {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  public count(timer: number): number {
    if (!timer) {
      return this.size;
    }

    let filtered = this.list.filter(notification => {
      return notification.createdAt > timer;
    });
    return filtered.size;
  }

  private findIndex(key: string): number {
    return this.list.findIndex((notification: INotification) => {
      return notification.key === key;
    });
  }
}
