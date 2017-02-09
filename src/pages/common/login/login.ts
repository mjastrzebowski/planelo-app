import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/core/auth/auth-service';
import { ClientStore } from 'app/core/client/client-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';

import { TrainingListPage } from 'app/pages/admin/training/training-list/training-list';

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

  // ngOnInit(): void {
  //   this.auth.subscribe((authenticated: boolean) => {
  //     if (authenticated) {
  //       this.nav.setRoot(TrainingListPage);
  //     }
  //   });
  // }

  // signInWithGithub(): void {
  //   this.auth.signInWithGithub()
  //     .then(() => this.postSignIn());
  // }

  // signInWithGoogle(): void {
  //   this.auth.signInWithGoogle()
  //     .then(() => this.postSignIn());
  // }

  // signInWithTwitter(): void {
  //   this.auth.signInWithTwitter()
  //     .then(() => this.postSignIn());
  // }

  login(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.utils.presentLoading('Logowanie...');
      this.auth.login(form.value)
        .then(() => this.postLogin())
        .catch(() => this.errorLogin());
    }
  }

  // signUpWithPassword(form: any): void {
  //   this.submitted = true;
  //   if (form.valid) {
  //     this.auth.signUpWithPassword(form.value)
  //       .then(() => this.postSignIn());
  //   }
  // }

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
    let alert = this.alertCtrl.create({
      title: 'Błąd',
      message: 'Nieprawidłowy login lub hasło.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
