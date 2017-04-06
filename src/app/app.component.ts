import { Component, ViewChild } from '@angular/core';

import { Nav, MenuController } from 'ionic-angular';

// services
import { AuthService } from 'app/services/auth/auth-service';
import { Utils } from 'app/providers/utils';

// pages - common
import { ImportPage } from 'app/pages/common/import/import';
import { LoginPage } from 'app/pages/common/login/login';
import { SettingsPage } from 'app/pages/common/settings/settings';
import { NotificationListPage } from 'app/pages/common/notification/notification-list/notification-list';

// pages - admin
import { BillListPage } from 'app/pages/admin/bill/bill-list/bill-list';
import { ClientListPage } from 'app/pages/admin/client/client-list/client-list';
import { CompanyListPage } from 'app/pages/admin/company/company-list/company-list';
import { ExerciseListPage } from 'app/pages/admin/exercise/exercise-list/exercise-list';
import { RoutineListPage } from 'app/pages/admin/routine/routine-list/routine-list';
import { TrainerListPage } from 'app/pages/admin/trainer/trainer-list/trainer-list';
import { TrainingListPage } from 'app/pages/admin/training/training-list/training-list';
import { TrainingSchedulerPage } from 'app/pages/admin/training/training-scheduler/training-scheduler';

// pages - trainer
import { TrainingListTrainerPage } from 'app/pages/trainer/training/training-list/training-list';

// pages - client
import { TrainingListClientPage } from 'app/pages/client/training/training-list/training-list';
import { WorkoutReserveModal } from 'app/pages/client/workout/workout-reserve/workout-reserve';


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
export class DavidApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  adminPages: PageInterface[] = [
    { title: 'Firmy', component: CompanyListPage, icon: 'book' },
    { title: 'Import danych', component: ImportPage, icon: 'cloud-upload' }
  ];
  companyPages: PageInterface[] = [
    { title: 'Treningi', component: TrainingListPage, icon: 'clipboard' },
    { title: 'Grafik', component: TrainingSchedulerPage, icon: 'calendar' },
    { title: 'Klienci', component: ClientListPage, icon: 'contacts' },
    { title: 'Rachunki', component: BillListPage, icon: 'cash' },
    { title: 'Pracownicy', component: TrainerListPage, icon: 'people' },
    { title: 'Miejsca', component: TrainerListPage, icon: 'pin' },
    { title: 'Ćwiczenia', component: ExerciseListPage, icon: 'list' },
    { title: 'Plany treningowe', component: RoutineListPage, icon: 'list' }
  ];
  trainerPages: PageInterface[] = [
    { title: 'Treningi', component: TrainingListTrainerPage, icon: 'clipboard' }
  ];
  clientPages: PageInterface[] = [
    { title: 'Treningi', component: TrainingListClientPage, icon: 'clipboard' }
  ];
  commonPages: PageInterface[] = [
    { title: 'Ustawienia', component: SettingsPage, icon: 'settings' },
    // { title: 'Zaloguj', component: LoginPage, icon: 'log-in' },
    // { title: 'Rejestracja', component: SignupPage, icon: 'person-add' },
    { title: 'Wyloguj', component: LoginPage, icon: 'log-out' }
  ];
  authenticated: boolean;
  root: any;
  showUserBar: boolean;

  constructor(
    private utils: Utils,
    public menu: MenuController,
    public auth: AuthService
  ) {
    this.utils.showLoading('Uruchamianie aplikacji...');
    this.auth.subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
      this.utils.stopLoading();
      if (!this.authenticated) {
        this.root = LoginPage;
      } else {
        // this.root = TrainingListPage;
        // this.root = ExerciseListPage;
        this.root = CompanyListPage;
        // this.root = WorkoutReserveModal;
      }
    });
  }

  signOut(): void {
    this.auth.logout();
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
      this.nav.setRoot(page.component);
    }
    this.menu.close('right');
  }
}
