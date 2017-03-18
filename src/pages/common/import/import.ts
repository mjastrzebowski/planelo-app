import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { List } from 'immutable';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';

import { ClientStore } from 'app/services/client/client-store';
import { NotificationStore } from 'app/services/notification/notification-store';
import { PlaceStore } from 'app/services/place/place-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { WorkoutStore } from 'app/services/workout/workout-store';

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
    private workoutStore: WorkoutStore
  ) {
    this.submitted = false;
    this.import = {};
  }

  private resolveItem(item, service) {
    if (typeof item === 'object') {
      return JSON.stringify(item);
    }
    return service.getItemByKey(item);
  }

  save(form): void {
    this.submitted = true;
    let data = Utils.objectToArray(JSON.parse(form.value.db));
    console.log(this.model);

    switch (this.model) {
      case this.notificationStore.model:
        data.forEach(item => {
          item.admin = item.owner;
          item.client = this.resolveItem(item.client, this.clientStore);
          item.workout = this.resolveItem(item.workout, this.workoutStore);
          this.notificationStore.create(item);
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
