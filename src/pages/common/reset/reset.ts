import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { ClientStore } from 'app/services/client/client-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';

@Component({
  templateUrl: 'reset.html'
})

export class ResetPage {
  user: any;
  submitted: boolean;

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private utils: Utils,
    private auth: AuthService,
    private clientStore: ClientStore,
    private trainerStore: TrainerStore
  ) {
    this.user = {};
    this.submitted = false;
  }

  openLoginPage(): void {
    this.nav.pop();
  }

  reset(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.utils.showLoading('Resetowanie...');
      this.auth.reset(form.value)
        .then(() => this.postReset())
        .catch(() => this.errorReset());
    }
  }

  private postReset(): void {
    this.utils.stopLoading();
    this.alertCtrl.create({
      title: 'Wysłano',
      message: 'Nowe hasło zostało wysłane na adres e-mail.',
      buttons: ['Ok']
    }).present();
  }

  private errorReset(): void {
    this.utils.stopLoading();
    this.alertCtrl.create({
      title: 'Błąd',
      message: 'Nieprawidłowy login.',
      buttons: ['Ok']
    }).present();
  }
}
