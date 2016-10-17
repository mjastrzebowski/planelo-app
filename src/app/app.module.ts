import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// import { Firebase } from 'firebase';

import { IonicApp, IonicModule } from 'ionic-angular';
import { DavidApp } from './app.component';

import { Utils } from '../providers/utils';

// providers
import { AUTH_PROVIDERS } from '../core/auth/providers';
import { USER_PROVIDERS } from '../core/user/providers';
import { CLIENT_PROVIDERS } from '../core/client/providers';
import { PLACE_PROVIDERS } from '../core/place/providers';
import { TRAINER_PROVIDERS } from '../core/trainer/providers';
import { WORKOUT_PROVIDERS } from '../core/workout/providers';
import { BILL_PROVIDERS } from '../core/bill/providers';
import { NOTIFICATION_PROVIDERS } from '../core/notification/providers';

// components
import { BillItem } from '../components/bill/bill-item/bill-item';
import { BillList } from '../components/bill/bill-list/bill-list';
import { BillFilter } from '../components/bill/bill-filter/bill-filter';
import { BillListFilterPipe } from '../components/bill/bill-list/bill-list-filter-pipe';

import { ClientItem } from '../components/client/client-item/client-item';
import { ClientList } from '../components/client/client-list/client-list';
import { ClientFilter } from '../components/client/client-filter/client-filter';
import { ClientListFilterPipe } from '../components/client/client-list/client-list-filter-pipe';

import { NotificationItem } from '../components/notification/notification-item/notification-item';
import { NotificationList } from '../components/notification/notification-list/notification-list';
import { NotificationFilter } from '../components/notification/notification-filter/notification-filter';
import { NotificationCounter } from '../components/notification/notification-counter/notification-counter';
import { NotificationListFilterPipe } from '../components/notification/notification-list/notification-list-filter-pipe';

import { WorkoutItem } from '../components/workout/workout-item/workout-item';
import { WorkoutList } from '../components/workout/workout-list/workout-list';
import { WorkoutListGroupPipe } from '../components/workout/workout-list/workout-list-group-pipe';
import { WorkoutListFilterPipe } from '../components/workout/workout-list/workout-list-filter-pipe';

// pages
// import { AboutPage } from '../pages/about/about';

import { BillListPage } from '../pages/bill/bill-list/bill-list';
import { ClientCreateModal } from '../pages/client/client-create/client-create';
import { ClientDetailPage } from '../pages/client/client-detail/client-detail';
import { ClientDetailAccessModal } from '../pages/client/client-detail-access/client-detail-access';
import { ClientDetailBillingModal } from '../pages/client/client-detail-billing/client-detail-billing';
import { ClientDetailProfileModal } from '../pages/client/client-detail-profile/client-detail-profile';
import { ClientDetailWorkoutsModal } from '../pages/client/client-detail-workouts/client-detail-workouts';
import { ClientListPage } from '../pages/client/client-list/client-list';
import { LoginPage } from '../pages/login/login';
import { NotificationListPage } from '../pages/notification/notification-list/notification-list';
import { TrainerCreateModal } from '../pages/trainer/trainer-create/trainer-create';
import { TrainerDetailPage, GroupHoursPipe } from '../pages/trainer/trainer-detail/trainer-detail';
import { TrainerDetailHoursModal } from '../pages/trainer/trainer-detail-hours/trainer-detail-hours';
import { TrainerDetailProfileModal } from '../pages/trainer/trainer-detail-profile/trainer-detail-profile';
import { TrainerDetailVacationModal } from '../pages/trainer/trainer-detail-vacation/trainer-detail-vacation';
import { TrainerListPage } from '../pages/trainer/trainer-list/trainer-list';
import { TrainingCreateModal } from '../pages/training/training-create/training-create';
import { TrainingDetailPage } from '../pages/training/training-detail/training-detail';
import { TrainingHistoryModal } from '../pages/training/training-history/training-history';
import { TrainingListPage } from '../pages/training/training-list/training-list';
import { TrainingReserveModal } from '../pages/training/training-reserve/training-reserve';
import { TrainingSchedulerPage } from '../pages/training/training-scheduler/training-scheduler';
import { TrainingSchedulerFormModal } from '../pages/training/training-scheduler-form/training-scheduler-form';
import { SettingsPage } from '../pages/settings/settings';

@NgModule({
  declarations: [
    DavidApp,

    BillItem,
    BillList,
    BillFilter,
    BillListFilterPipe,

    ClientItem,
    ClientList,
    ClientFilter,
    ClientListFilterPipe,

    NotificationItem,
    NotificationList,
    NotificationFilter,
    NotificationCounter,
    NotificationListFilterPipe,

    WorkoutItem,
    WorkoutList,
    WorkoutListGroupPipe,
    WorkoutListFilterPipe,

    GroupHoursPipe,

    BillListPage,
    ClientCreateModal,
    ClientDetailPage,
    ClientDetailAccessModal,
    ClientDetailBillingModal,
    ClientDetailProfileModal,
    ClientDetailWorkoutsModal,
    ClientListPage,
    LoginPage,
    NotificationListPage,
    TrainerCreateModal,
    TrainerDetailPage,
    TrainerDetailHoursModal,
    TrainerDetailProfileModal,
    TrainerDetailVacationModal,
    TrainerListPage,
    TrainingCreateModal,
    TrainingDetailPage,
    TrainingHistoryModal,
    TrainingListPage,
    TrainingReserveModal,
    TrainingSchedulerPage,
    TrainingSchedulerFormModal,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(DavidApp, {
      statusbarPadding: false,
      platforms: {
        android: {
          activator: 'ripple',
          backButtonIcon: 'md-arrow-back'
        }
      },
      prodMode: true
    })
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    DavidApp,

    BillListPage,
    ClientCreateModal,
    ClientDetailPage,
    ClientDetailAccessModal,
    ClientDetailBillingModal,
    ClientDetailProfileModal,
    ClientDetailWorkoutsModal,
    ClientListPage,
    LoginPage,
    NotificationListPage,
    TrainerCreateModal,
    TrainerDetailPage,
    TrainerDetailHoursModal,
    TrainerDetailProfileModal,
    TrainerDetailVacationModal,
    TrainerListPage,
    TrainingCreateModal,
    TrainingDetailPage,
    TrainingHistoryModal,
    TrainingListPage,
    TrainingReserveModal,
    TrainingSchedulerPage,
    TrainingSchedulerFormModal,
    SettingsPage
  ],
  providers: [
    // HttpModule,
    AUTH_PROVIDERS,
    USER_PROVIDERS,
    CLIENT_PROVIDERS,
    PLACE_PROVIDERS,
    TRAINER_PROVIDERS,
    WORKOUT_PROVIDERS,
    BILL_PROVIDERS,
    NOTIFICATION_PROVIDERS,
    Utils
  ]
})
export class AppModule {}
