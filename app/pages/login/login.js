import { Component } from '@angular/core';
import { App, Alert, NavController } from 'ionic-angular';

// import { AuthRouteHelper } from '../../core/auth/auth-route-helper';
import { AuthService } from '../../core/auth/auth-service';
import { ClientStore } from '../../core/client/client-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { TrainingListPage } from '../training-list/training-list';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  constructor(app: App, nav: NavController, auth: AuthService, clientStore: ClientStore, trainerStore: TrainerStore) {
    this.app = app;
    this.nav = nav;
    this.auth = auth;

    this.clientStore = clientStore;
    this.trainerStore = trainerStore;

    this.login = {};
    this.submitted = false;

    if (this.auth.authenticated) {
      // console.log('test login auth');
      this.nav.setRoot(TrainingListPage);
    } else {
      // console.log('test login not');
    }

    // this.auth.subscribe((authenticated: boolean) => {
    //   this.authenticated = authenticated;
    //   console.log('test login sub', this.nav.root.name);
    //   if (this.authenticated && this.nav.root.name === 'LoginPage') {
    //     // this.nav.setRoot(TrainingListPage);
    //   } else {
    //     // this.nav.setRoot(LoginPage);
    //   }
    //   // this.userData.login();
    // });
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
            let alert = Alert.create({
              title: 'Błąd',
              message: 'Nieprawidłowy login lub hasło.',
              buttons: ['Ok']
            });
            setTimeout(() => {
              this.nav.present(alert);
            }, 500);
          });
    }
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
    // this.router.navigate(['/Workouts']);
    this.nav.setRoot(TrainingListPage);
  }
}
