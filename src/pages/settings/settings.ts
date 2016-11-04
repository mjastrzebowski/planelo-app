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
    this.submitted = false;
    this.settings = {};
  }

  ngOnInit(): void {
    this.settings.email = this.auth.email;
  }

  changePassword(form): void {
    this.submitted = true;
    if (form.valid) {
      this.auth.changePassword(form.value)
        .then(() => this.postChangePassword())
        .catch(() => this.errorChangePassword());
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
