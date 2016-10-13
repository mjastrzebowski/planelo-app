import { Component } from '@angular/core';
import { App, AlertController, NavController } from 'ionic-angular';

// import { AuthRouteHelper } from '../../core/auth/auth-route-helper';
import { Utils } from '../../providers/utils';

import { AuthService } from '../../core/auth/auth-service';
import { ClientStore } from '../../core/client/client-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { TrainingListPage } from '../training/training-list/training-list';
import { ClientListPage } from '../client/client-list/client-list';

@Component({
  templateUrl: 'login.html'
})

export class LoginPage {
  constructor(public app: App, public nav: NavController, public alertCtrl: AlertController, public utils: Utils, public auth: AuthService, public clientStore: ClientStore, public trainerStore: TrainerStore) {

    this.login = {};
    this.submitted = false;

    if (this.auth.authenticated) {
      this.nav.setRoot(TrainingListPage);
    }
  }

  signInWithGithub(): void {
    this.auth.signInWithGithub()
      .then(() => this.postSignIn());
  }

  signInWithGoogle(): void {
    this.auth.signInWithGoogle()
      .then(() => this.postSignIn());
  }

  signInWithTwitter(): void {
    this.auth.signInWithTwitter()
      .then(() => this.postSignIn());
  }

  signInWithPassword(form): void {
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
        .then(() => this.postSignIn(),
          (error) => {
            this.utils.stopLoading();
            setTimeout(() => {
              let alert = this.alertCtrl.create({
                title: 'Błąd',
                message: 'Nieprawidłowy login lub hasło.',
                buttons: ['Ok']
              });
              alert.present(present);
            }, 500);
          });
    }
    // this.utils.stopLoading();
  }

  signUpWithPassword(form): void {
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
    setTimeout(() => {
      this.nav.setRoot(TrainingListPage);
    }, 500);
  }
}
