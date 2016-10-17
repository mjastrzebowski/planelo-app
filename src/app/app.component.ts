import { Component, ViewChild } from '@angular/core';

import { Nav, MenuController } from 'ionic-angular';

// services
import { AuthService } from '../core/auth/auth-service';

// pages
import { BillListPage } from '../pages/bill/bill-list/bill-list';
import { ClientListPage } from '../pages/client/client-list/client-list';
import { LoginPage } from '../pages/login/login';
import { NotificationListPage } from '../pages/notification/notification-list/notification-list';
import { TrainerListPage } from '../pages/trainer/trainer-list/trainer-list';
import { TrainingListPage } from '../pages/training/training-list/training-list';
import { TrainingSchedulerPage } from '../pages/training/training-scheduler/training-scheduler';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
// @RouteConfig([
//   // { path: '/', component: HomeComponent, name: 'Home', useAsDefault: true },
//   // { path: '/about', component: AboutComponent, name: 'About' },
//   // { path: '/game/...', component: MenuComponent, name: 'Menu' },
//   // { path: '/', component: DavidApp, as: 'Home', useAsDefault: true },
//   // { path: '/about', component: AboutPage, as: 'About' }
// ])
export class DavidApp {
  @ViewChild(Nav) nav: Nav;

  constructor(
    public menu: MenuController,
    public auth: AuthService
  ) {
    // We plan to add auth to only show the login page if not logged in
    // this.root = TutorialPage;
    this.root = LoginPage;

    // create an list of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    this.pages = [
      { title: 'Treningi', component: TrainingListPage, icon: 'clipboard', hide: true },
      { title: 'Grafik', component: TrainingSchedulerPage, icon: 'calendar', hide: true },
      { title: 'Klienci', component: ClientListPage, icon: 'contacts', hide: true },
      // { title: 'Rachunki', component: BillListPage, icon: 'cash', hide: true },
      { title: 'Trenerzy', component: TrainerListPage, icon: 'people', hide: true },
      // { title: 'Baza ćwiczeń', component: ExerciseListPage, icon: 'folder', hide: true },
      // { title: 'Aktualności', component: AboutPage, icon: 'information-circle', hide: false },
      // { title: 'Powiadomienia', component: NotificationListPage, icon: 'notifications', hide: true },
      { title: 'Ustawienia', component: SettingsPage, icon: 'settings', hide: true },
      { title: 'Zaloguj', component: LoginPage, icon: 'log-in', hide: false },
      // { title: 'Rejestracja', component: SignupPage, icon: 'person-add', hide: true },
      { title: 'Wyloguj', component: LoginPage, icon: 'log-out', hide: true },
    ];

    this.auth.subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
      this.updateSideMenuItems(authenticated);
      if (!this.authenticated) {
        this.root = LoginPage;
      }
    });

    // decide which menu items should be hidden by current login status stored in local storage
    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
    //   if (hasLoggedIn) {
    //     // this.root = TrainingListPage;
    //     this.root = ClientListPage;
    //   }
    //   this.updateSideMenuItems(hasLoggedIn)
    // });

    // this.listenToLoginEvents();
  }

  signOut(): void {
    // console.log('test app signout');
    this.auth.signOut();
    this.root = LoginPage;
    this.nav.setRoot(LoginPage);
    location.reload();
  }

  openPage(page, data) {
    if (typeof page === 'string') {
      switch (page) {
        case 'NotificationListPage':
          this.nav.push(NotificationListPage, data);
          break;
      }
    } else if (page.title === 'Wyloguj') {
      this.signOut();
    } else {

    // find the nav component and set what the root page should be
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    // console.log('test setroot', Utils);
    // let utils = new Utils(this.app);
    // debugger;
    // utils.stopLoading().then(() => {
    //   console.log('test');
      this.nav.setRoot(page.component);
    // });
    // this.utils.stopLoading();
    }
    this.menu.close('right');
  }

  // listenToLoginEvents() {
  //   this.events.subscribe('user:login', () => {
  //     this.updateSideMenuItems(true);
  //   });

  //   this.events.subscribe('user:signup', () => {
  //     this.updateSideMenuItems(true);
  //   });

  //   this.events.subscribe('user:logout', () => {
  //     this.updateSideMenuItems(false);
  //   });
  // }

  updateSideMenuItems(hasLoggedIn) {
    if (hasLoggedIn) {
      this.showUserBar = true;
      if (this.auth.isOwner) {
        this.findMenuItemByTitle('Treningi').hide = false;
        this.findMenuItemByTitle('Grafik').hide = false;
        this.findMenuItemByTitle('Klienci').hide = false;
        // this.findMenuItemByTitle('Rachunki').hide = false;
        this.findMenuItemByTitle('Trenerzy').hide = false;
      } else if (this.auth.isTrainer) {
        this.findMenuItemByTitle('Treningi').hide = false;
        this.findMenuItemByTitle('Grafik').hide = true;
        this.findMenuItemByTitle('Klienci').hide = true;
        // this.findMenuItemByTitle('Rachunki').hide = true;
        this.findMenuItemByTitle('Trenerzy').hide = true;
      } else if (this.auth.isClient) {
        this.findMenuItemByTitle('Treningi').hide = false;
        this.findMenuItemByTitle('Grafik').hide = true;
        this.findMenuItemByTitle('Klienci').hide = true;
        // this.findMenuItemByTitle('Rachunki').hide = true;
        this.findMenuItemByTitle('Trenerzy').hide = true;
      }
      // this.findMenuItemByTitle('Baza ćwiczeń').hide = true;
      this.findMenuItemByTitle('Ustawienia').hide = false;
      this.findMenuItemByTitle('Zaloguj').hide = true;
      this.findMenuItemByTitle('Wyloguj').hide = false;
    } else {
      this.showUserBar = false;
      this.findMenuItemByTitle('Treningi').hide = true;
      this.findMenuItemByTitle('Grafik').hide = true;
      this.findMenuItemByTitle('Klienci').hide = true;
      // this.findMenuItemByTitle('Rachunki').hide = true;
      this.findMenuItemByTitle('Trenerzy').hide = true;
      // this.findMenuItemByTitle('Baza ćwiczeń').hide = true;
      this.findMenuItemByTitle('Ustawienia').hide = true;
      this.findMenuItemByTitle('Zaloguj').hide = false;
      this.findMenuItemByTitle('Wyloguj').hide = true;
    }
  }

  findMenuItemByTitle(title) {
    return this.pages.find((menuItem) => {
      return menuItem.title === title
    })
  }
}
