import { Component } from '@angular/core';
import { App, AlertController, NavController } from 'ionic-angular';

import { Utils } from '../../providers/utils';
import { AuthService } from '../../core/auth/auth-service';

import { NotificationCounter } from '../../components/notification/notification-counter/notification-counter';

@Component({
  templateUrl: 'settings.html',
  directives: [
    NotificationCounter
  ]
})

export class SettingsPage {
  constructor(public app: App, public nav: NavController, public alertCtrl: AlertController, public utils: Utils, public auth: AuthService) {

    this.settings = {};
    this.submitted = false;

    // this.auth.subscribe((authenticated: boolean) => {
    //   this.authenticated = authenticated;
    //   console.log('test settings sub', this.nav.root.name);
    //   if (this.authenticated && this.nav.root.name === 'LoginPage') {
    //     // this.nav.setRoot(TrainingListPage);
    //   } else {
    //     // this.nav.setRoot(LoginPage);
    //   }
    //   // this.userData.settings();
    // });
  }

  ionViewLoaded() {
    this.settings.email = this.auth.email;
  }

  changePassword(form): void {
    this.submitted = true;
    if (form.valid) {
      this.auth.changePassword(form.value)
        .then(() => this.postChangePassword());
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
}
