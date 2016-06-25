import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  constructor(nav: NavController, userData: UserData) {
    this.nav = nav;
    this.userData = userData;

    this.signup = {};
    this.submitted = false;
  }

  onSignup(form) {
    this.submitted = true;

    console.log(form);

    if (form.valid) {
      this.userData.signup();
      this.nav.push(TabsPage);
    }
  }
}
