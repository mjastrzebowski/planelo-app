import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { INotification } from './notification';

export class NotificationStore {
  notifications: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase, auth: AuthService) {
    this.auth = auth;
    // ref = ref.orderByChild('createdAt');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): INotification {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  private updateNotificationDependencies(notification: INotification): void {
    moment.locale('pl');
    let created = moment(notification.createdAt);
    notification.fromNow = created.fromNow();

    // if (!workout.weekDay || workout.weekDay == 'Invalid Date' || workout.weekDay == 'Invalid date') {
    //   workout.weekDay = workout.fullDate.toLocaleDateString('pl', { weekday: 'long' });
    // }
    // workout.descDate = workout.weekDay + ', ' + date + '.' + monthStr + '.' + year + ' r.';
  }
  private emit(): void {
    this.notifications.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let val = snapshot.val();
      let notification: INotification = val;
      notification.key = key;
      this.list = this.list.push(notification);
      this.updateNotificationDependencies(notification);
      this.emit();
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let notification: INotification = snapshot.val();
      notification.key = key;
      this.list = this.list.set(index, notification);
      this.updateNotificationDependencies(notification);
      this.emit();
    }
  }

  private findIndex(key: string): number {
    return this.list.findIndex((notification: INotification) => {
      return notification.key === key;
    });
  }
}
