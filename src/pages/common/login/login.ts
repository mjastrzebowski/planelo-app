import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { ClientStore } from 'app/services/client/client-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';

@IonicPage({
  name: 'login',
  segment: 'login'
})
@Component({
  templateUrl: 'login.html'
})
export class LoginPage {
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

  openResetPage(): void {
    this.nav.push('reset');
  }

  openRegisterPage(): void {
    this.nav.push('register');
  }

  login(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.utils.showLoading('Logowanie...');
      this.auth.login(form.value)
        .then(() => this.postLogin())
        .catch(() => this.errorLogin());
    }
  }

  logout(): void {
    this.auth.logout();
  }

  private postLogin(): void {
    this.utils.stopLoading();
    // this.router.navigate(['/Workouts']);
    // this.nav.setRoot(TrainingListPage);
  }

  private errorLogin(): void {
    this.utils.stopLoading();
    this.alertCtrl.create({
      title: 'Błąd',
      message: 'Nieprawidłowy login lub hasło.',
      buttons: ['Ok']
    }).present();
  }
}
