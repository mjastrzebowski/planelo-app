import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { Utils } from '../../providers/utils';

import { AuthService } from '../../core/auth/auth-service';
import { ClientStore } from '../../core/client/client-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { TrainingListPage } from '../training/training-list/training-list';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {
  login: any;
  submitted: boolean;

  constructor(
    private nav: NavController,
    private alertCtrl: AlertController,
    private utils: Utils,
    private auth: AuthService,
    private clientStore: ClientStore,
    private trainerStore: TrainerStore
  ) {
    this.login = {};
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

  signInWithPassword(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.utils.presentLoading('Logowanie...');
      let client = this.clientStore.getItemByUsername(form.value.email);
      if (client) {
        form.value.email = client.email;
      } else {
        let trainer = this.trainerStore.getItemByUsername(form.value.email);
        if (trainer) {
          form.value.email = trainer.email;
        }
      }

      this.auth.signInWithPassword(form.value)
        .then(() => this.postSignIn())
        .catch(() => this.errorSignIn());
    }
  }

  signUpWithPassword(form: any): void {
    this.submitted = true;
    if (form.valid) {
      this.auth.signUpWithPassword(form.value)
        .then(() => this.postSignIn());
    }
  }

  signOut(): void {
    this.auth.signOut();
  }

  private postSignIn(): void {
    this.utils.stopLoading();
    // this.router.navigate(['/Workouts']);
    this.nav.setRoot(TrainingListPage);
  }

  private errorSignIn(): void {
    this.utils.stopLoading();
    let alert = this.alertCtrl.create({
      title: 'Błąd',
      message: 'Nieprawidłowy login lub hasło.',
      buttons: ['Ok']
    });
    alert.present();
  }
}
