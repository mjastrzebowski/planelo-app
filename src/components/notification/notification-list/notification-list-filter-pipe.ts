import { Pipe, PipeTransform, ChangeDetectionStrategy } from '@angular/core';

import { INotification } from 'app/core/notification/notification';


@Pipe({
  name: 'filterNotifications',
  pure: false
})
export class NotificationListFilterPipe implements PipeTransform {
  transform(list: INotification[], filter?: any, limit?: any): INotification[] {
    if (!list) {
      return list;
    }

    if (filter) {
      list = this.filter(list, 'place', filter.place);
      list = this.filter(list, 'trainer', filter.trainer);
      list = this.filter(list, 'client', filter.client);
    }

    return list.slice().reverse().slice(0, limit);
  }

  filter(list, key, value): INotification[] {
    if (!value) {
      return list;
    }
    return list.filter((notification: INotification) => {
      return notification[key] === value || (notification.workout && notification.workout[key] === value) || (notification.client && notification.client.key === value);
    });
  }
}
