import { Component } from '@angular/core';
import { App, Alert, NavController } from 'ionic-angular';

// import { AuthRouteHelper } from '../../core/auth/auth-route-helper';
import { Utils } from '../../providers/utils';

import { AuthService } from '../../core/auth/auth-service';
import { ClientStore } from '../../core/client/client-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { TrainingListPage } from '../training/training-list/training-list';
import { ClientListPage } from '../client/client-list/client-list';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor(app: App, nav: NavController, utils: Utils, auth: AuthService, clientStore: ClientStore, trainerStore: TrainerStore) {
    this.app = app;
    this.nav = nav;
    this.utils = utils;
    this.auth = auth;

    this.clientStore = clientStore;
    this.trainerStore = trainerStore;

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
              let alert = Alert.create({
                title: 'Błąd',
                message: 'Nieprawidłowy login lub hasło.',
                buttons: ['Ok']
              });
              this.nav.present(alert);
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
