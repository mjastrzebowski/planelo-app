import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { List } from 'immutable';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';

import { NotificationStore } from 'app/services/notification/notification-store';

@Component({
  templateUrl: 'import.html'
})

export class ImportPage {
  model: any;
  import: any;
  submitted: boolean;
  models = ['Notification'];

  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService,
    private notificationStore: NotificationStore
  ) {
    this.submitted = false;
    this.import = {};
  }

  save(form): void {
    this.submitted = true;
    let data = Utils.objectToArray(JSON.parse(form.value.db));
    console.log(this.model);

    switch (this.model) {
      case this.notificationStore.model:
        data.forEach(item => {
          item.admin = item.owner;
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
