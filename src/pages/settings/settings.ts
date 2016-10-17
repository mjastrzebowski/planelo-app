import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../../core/auth/auth-service';

@Component({
  templateUrl: 'settings.html'
})

export class SettingsPage {
  constructor(
    private alertCtrl: AlertController,
    private auth: AuthService
  ) {
    this.settings = {};
    this.submitted = false;
  }

  ngOnInit(): void {
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
