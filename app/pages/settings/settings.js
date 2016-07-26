import { Component } from '@angular/core';
import { App, Alert, NavController } from 'ionic-angular';

// import { AuthRouteHelper } from '../../core/auth/auth-route-helper';
import { Utils } from '../../providers/utils';

import { AuthService } from '../../core/auth/auth-service';


@Component({
  templateUrl: 'build/pages/settings/settings.html'
})

export class SettingsPage {
  constructor(app: App, nav: NavController, utils: Utils, auth: AuthService) {
    this.app = app;
    this.nav = nav;
    this.utils = utils;
    this.auth = auth;

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
    let alert = Alert.create({
      title: 'Zmieniono',
      message: 'Twoje hasło zostało zmienione.',
      buttons: ['Ok']
    });
    this.nav.present(alert);
  }
}
