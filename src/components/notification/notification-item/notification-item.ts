import { Component, Input, Pipe } from '@angular/core';
import * as moment from 'moment';

import { App } from 'ionic-angular';

import { INotification } from 'app/core/notification/notification';
import { NotificationStore } from 'app/core/notification/notification-store';

import { PlaceStore } from 'app/core/place/place-store';
import { ClientStore } from 'app/core/client/client-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';

import { ClientDetailPage } from 'app/pages/admin/client/client-detail/client-detail';


@Component({
  selector: 'notification-item',
  templateUrl: 'notification-item.html'
})
export class NotificationItem {
  @Input() model: INotification;
  nav: any;

  constructor(
    private app: App,
    private notificationStore: NotificationStore,
    public placeStore: PlaceStore,
    public clientStore: ClientStore,
    public trainerStore: TrainerStore
  ) {}

  ngAfterContentChecked(): void {
    let created = moment(this.model.createdAt);
    this.model.fromNow = created.fromNow();
    this.model.descDate = created.format('DD.MM.YYYY, HH:mm');

    let read = parseInt(localStorage.getItem('notification-counter-read'));
    this.model.unread = (this.model.createdAt > read);
  }

  delete(): void {
    this.notificationStore.removeNotification(this.model);
  }

  // TEMP solution!
  getAdminAlias(key): string {
    switch (key) {
      case '-KBN-b7GjsB6FS8Opmx0':
      case '-KNSsNzm8WH_t_lwASAz': {
        return 'Michał';
      }
      case '-KBN-fYLnmIQ_6pSwnV6': {
        return 'Adam';
      }
      default: {
        return 'Jarek';
      }
    }
  }

  goToClientDetail(client): void {
    this.nav = this.app.getActiveNav();
    this.nav.push(ClientDetailPage, client);
  }
}
