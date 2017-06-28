import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';

import { List } from 'immutable';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';

import { ClientStore } from 'app/services/client/client-store';
import { NotificationStore } from 'app/services/notification/notification-store';
import { PlaceStore } from 'app/services/place/place-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { SessionStore } from 'app/services/session/session-store';

@IonicPage({
  name: 'import',
  segment: 'import'
})
@Component({
  templateUrl: 'import.html'
})
export class ImportPage {
  import: any;
  submitted: boolean;
  models = ['Notification'];
  model = this.models[0];

  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService,
    private clientStore: ClientStore,
    private notificationStore: NotificationStore,
    private placeStore: PlaceStore,
    private trainerStore: TrainerStore,
    private sessionStore: SessionStore
  ) {
    this.submitted = false;
    this.import = {};
  }

  private resolveItemByKey(item, service) {
    if (typeof item === 'object') {
      return JSON.stringify(item);
    }
    return service.getItemByKey(item);
  }

  private getAdminId(key) {
    switch (key) {
      case '-KBN-b7GjsB6FS8Opmx0':
      case '-KNSsNzm8WH_t_lwASAz': {
        return 106;
      }
      case '-KBN-fYLnmIQ_6pSwnV6': {
        return 11;
      }
      default: {
        return 2;
      }
    }
  }

  private importNotificationItem(item) {
    item.admin = this.getAdminId(item.owner);

    switch (item.type) {
      case 'clientAdded':

        break;
      case 'clientRemoved':
        break;
      case 'workoutAdded':
        break;
      case 'workoutRemoved':
        break;
      case 'workoutRejected':
        break;
    }
    item.client = this.resolveItemByKey(item.client, this.clientStore);
    item.workout = this.resolveItemByKey(item.workout, this.sessionStore);
    this.notificationStore.create(item);
  }

  save(form): void {
    this.submitted = true;
    let data = Utils.objectToArray(JSON.parse(form.value.db));
    console.log(this.model);

    switch (this.model) {
      case this.notificationStore.model:
        data.forEach(item => {
          this.importNotificationItem(item);
        });
        break;
    }
  }

  private postChangePassword(): void {
    let alert = this.alertCtrl.create({
      title: 'Zmieniono',
      message: 'Twoje hasło zostało zmienione.',
      buttons: ['Ok']
    });
    alert.present();
  }

  private errorChangePassword(): void {
    let alert = this.alertCtrl.create({
      title: 'Błąd',
      message: 'Obecne hasło jest nieprawidłowe.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
