import { Component, ViewChild } from '@angular/core';

import { Nav, MenuController } from 'ionic-angular';

import { AuthService } from 'app/services/auth/auth-service';
import { Utils } from 'app/providers/utils';


export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}


@Component({
  templateUrl: 'app.template.html'
})
export class PlaneloApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  adminPages: PageInterface[] = [
    { title: 'Firmy', component: 'companies', icon: 'briefcase' },
    { title: 'Import danych', component: 'import', icon: 'cloud-upload' }
  ];
  companyPages: PageInterface[] = [
    { title: 'Treningi', component: 'trainings', icon: 'clipboard' },
    { title: 'Grafik', component: 'scheduler', icon: 'calendar' },
    { title: 'Klienci', component: 'clients', icon: 'address-book-o' },
    { title: 'Rachunki', component: 'bills', icon: 'money' },
    { title: 'Pracownicy', component: 'trainers', icon: 'users' },
    { title: 'Miejsca', component: 'places', icon: 'globe' },
    { title: 'Ćwiczenia i plany', component: 'exercises', icon: 'book' }
  ];
  trainerPages: PageInterface[] = [
    { title: 'Treningi', component: 'trainings', icon: 'clipboard' }
  ];
  clientPages: PageInterface[] = [
    { title: 'Treningi', component: 'trainings', icon: 'clipboard' }
  ];
  commonPages: PageInterface[] = [
    { title: 'Ustawienia', component: 'settings', icon: 'cogs' },
    // { title: 'Zaloguj', component: 'login', icon: 'sign-in' },
    // { title: 'Rejestracja', component: 'signup', icon: 'user-plus' },
    { title: 'Wyloguj', component: 'login', icon: 'sign-out' }
  ];
  authenticated: boolean;
  root: any;
  showUserBar: boolean;

  constructor(
    private utils: Utils,
    public menu: MenuController,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Uruchamianie aplikacji...');
    this.auth.subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
      this.utils.stopLoading();
      if (!this.authenticated) {
        this.root = 'login';
      } else {
        this.root = 'companies';
      }
    });
  }

  signOut(): void {
    this.auth.logout();
    this.root = 'login';
    location.reload();
  }

  openPage(page, data) {
    if (typeof page === 'string') {
      this.nav.push(page, data);
    } else if (page.title === 'Wyloguj') {
      this.signOut();
    } else {
      this.nav.setRoot(page.component);
    }
    this.menu.close('right');
  }
}
