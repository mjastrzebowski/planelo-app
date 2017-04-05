import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { ClientStore } from 'app/services/client/client-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';

import { LoginPage } from 'app/pages/common/login/login';

@Component({
  templateUrl: 'register.html'
})

export class RegisterPage {
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
    this.nav.push(LoginPage);
  }

  register(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.utils.showLoading('Rejestrowanie...');
      this.auth.register(form.value)
        .then(() => this.postRegister())
        .catch(() => this.errorRegister());
    }
  }

  private postRegister(): void {
    this.utils.stopLoading();
    // this.router.navigate(['/Workouts']);
    // this.nav.setRoot(TrainingListPage);
  }

  private errorRegister(): void {
    this.utils.stopLoading();
    this.alertCtrl.create({
      title: 'Błąd',
      message: 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.',
      buttons: ['Ok']
    }).present();
  }
}
