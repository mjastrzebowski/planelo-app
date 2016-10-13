import { Component, Input, Pipe } from '@angular/core';

import { App } from 'ionic-angular';

import { INotification } from '../../../core/notification/notification';
import { NotificationService } from '../../../core/notification/notification-service';

import { PlaceStore } from '../../../core/place/place-store';
import { ClientStore } from '../../../core/client/client-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';

import { ClientDetailPage } from '../../../pages/client/client-detail/client-detail';


@Component({
  selector: 'notification-item',
  templateUrl: 'notification-item.html'
})
export class NotificationItem {
  @Input() model: INotification;

  editing: boolean = false;
  // title: string = '';

  constructor(private app: App, notificationService: NotificationService, public placeStore: PlaceStore, public clientStore: ClientStore, public trainerStore: TrainerStore) {}

  ngAfterContentChecked() {
    let created = moment(this.model.createdAt);
    this.model.fromNow = created.fromNow();
    this.model.descDate = created.format('DD.MM.YYYY, HH:mm');

    let read = localStorage.getItem('notification-counter-read');
    this.model.unread = (this.model.createdAt > read);
  }

  delete(): void {
    this.notificationService.deleteNotification(this.model);
  }

  editTitle(): void {
    this.editing = true;
    // this.title = this.model.title;
  }

  // saveTitle(): void {
  //   if (this.editing) {
  //     const title: string = this.title.trim();
  //     if (title.length && title !== this.model.title) {
  //       this.workoutService.updateWorkout(this.model, {title});
  //     }
  //     this.stopEditing();
  //   }
  // }

  stopEditing(): void {
    this.editing = false;
  }

  toggleStatus(): void {
    this.notificationService.updateNotification(this.model, {
      completed: !this.model.completed
    });
  }

  // TEMP solution!
  getOwnerAlias(key) {
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

  goToClientDetail(client) {
    this.nav = this.app.getActiveNav();
    this.nav.push(ClientDetailPage, client);
  }
}
