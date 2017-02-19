import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FIREBASE_PROVIDERS } from 'angularfire2';

import { IonicApp, IonicModule } from 'ionic-angular';
import { DavidApp } from './app.component';

import { FirebaseModule } from '../firebase-module';

import { Utils } from 'app/providers/utils';

// services
import { Api } from 'app/core/api/api-service';
import { AuthService } from 'app/core/auth/auth-service';

import { ExerciseService } from 'app/core/exercise/exercise-service';
import { PlaceService } from 'app/core/place/place-service';
import { WorkoutService } from 'app/core/workout/workout-service';
// import { TrainerService } from 'app/core/trainer/trainer-service';

import { BillStore } from 'app/core/bill/bill-store';
import { ClientStore } from 'app/core/client/client-store';
import { ExerciseStore } from 'app/core/exercise/exercise-store';
import { NotificationStore } from 'app/core/notification/notification-store';
import { PlaceStore } from 'app/core/place/place-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';
import { UserStore } from 'app/core/user/user-store';
import { WorkoutStore } from 'app/core/workout/workout-store';

// providers
// import { USER_PROVIDERS } from 'app/core/user/providers';
// import { PLACE_PROVIDERS } from 'app/core/place/providers';
// import { TRAINER_PROVIDERS } from 'app/core/trainer/providers';
// import { WORKOUT_PROVIDERS } from 'app/core/workout/providers';
// import { BILL_PROVIDERS } from 'app/core/bill/providers';

// components
import { BillItem } from 'app/components/bill/bill-item/bill-item';
import { BillList } from 'app/components/bill/bill-list/bill-list';
import { BillFilter } from 'app/components/bill/bill-filter/bill-filter';
import { BillListFilterPipe } from 'app/components/bill/bill-list/bill-list-filter-pipe';

import { ClientItem } from 'app/components/client/client-item/client-item';
import { ClientList } from 'app/components/client/client-list/client-list';
import { ClientFilter } from 'app/components/client/client-filter/client-filter';
import { ClientListFilterPipe } from 'app/components/client/client-list/client-list-filter-pipe';

import { ExerciseItem } from 'app/components/admin/exercise/exercise-item/exercise-item';
import { ExerciseList } from 'app/components/admin/exercise/exercise-list/exercise-list';
import { ExerciseListFilterPipe } from 'app/components/admin/exercise/exercise-list/exercise-list-filter-pipe';

import { NotificationItem } from 'app/components/notification/notification-item/notification-item';
import { NotificationList } from 'app/components/notification/notification-list/notification-list';
import { NotificationFilter } from 'app/components/notification/notification-filter/notification-filter';
import { NotificationCounter } from 'app/components/notification/notification-counter/notification-counter';
import { NotificationListFilterPipe } from 'app/components/notification/notification-list/notification-list-filter-pipe';

import { WorkoutItem } from 'app/components/workout/workout-item/workout-item';
import { WorkoutList } from 'app/components/workout/workout-list/workout-list';
import { WorkoutListGroupPipe } from 'app/components/workout/workout-list/workout-list-group-pipe';
import { WorkoutListFilterPipe } from 'app/components/workout/workout-list/workout-list-filter-pipe';

// pages - common
import { LoginPage } from 'app/pages/common/login/login';
import { SettingsPage } from 'app/pages/common/settings/settings';
import { NotificationListPage } from 'app/pages/common/notification/notification-list/notification-list';

// pages - admin
import { BillListPage } from 'app/pages/admin/bill/bill-list/bill-list';
import { ClientCreateModal } from 'app/pages/admin/client/client-create/client-create';
import { ClientDetailPage } from 'app/pages/admin/client/client-detail/client-detail';
import { ClientDetailAccessModal } from 'app/pages/admin/client/client-detail-access/client-detail-access';
import { ClientDetailBillingModal } from 'app/pages/admin/client/client-detail-billing/client-detail-billing';
import { ClientDetailProfileModal } from 'app/pages/admin/client/client-detail-profile/client-detail-profile';
import { ClientDetailWorkoutsModal } from 'app/pages/admin/client/client-detail-workouts/client-detail-workouts';
import { ClientListPage } from 'app/pages/admin/client/client-list/client-list';
import { ExerciseListPage } from 'app/pages/admin/exercise/exercise-list/exercise-list';
import { TrainerCreateModal } from 'app/pages/admin/trainer/trainer-create/trainer-create';
import { TrainerDetailPage, GroupHoursPipe } from 'app/pages/admin/trainer/trainer-detail/trainer-detail';
import { TrainerDetailHoursModal } from 'app/pages/admin/trainer/trainer-detail-hours/trainer-detail-hours';
import { TrainerDetailProfileModal } from 'app/pages/admin/trainer/trainer-detail-profile/trainer-detail-profile';
import { TrainerDetailVacationModal } from 'app/pages/admin/trainer/trainer-detail-vacation/trainer-detail-vacation';
import { TrainerListPage } from 'app/pages/admin/trainer/trainer-list/trainer-list';
import { TrainingCreateModal } from 'app/pages/admin/training/training-create/training-create';
import { TrainingDetailPage } from 'app/pages/admin/training/training-detail/training-detail';
import { TrainingHistoryModal } from 'app/pages/admin/training/training-history/training-history';
import { TrainingListPage } from 'app/pages/admin/training/training-list/training-list';
import { TrainingSchedulerPage } from 'app/pages/admin/training/training-scheduler/training-scheduler';
import { TrainingSchedulerFormModal } from 'app/pages/admin/training/training-scheduler-form/training-scheduler-form';

// pages - trainer
import { TrainingListTrainerPage } from 'app/pages/trainer/training/training-list/training-list';

// pages - client
import { TrainingListClientPage } from 'app/pages/client/training/training-list/training-list';
import { TrainingReserveModal } from 'app/pages/client/training/training-reserve/training-reserve';



@NgModule({
  declarations: [
    DavidApp,

    // components
    BillItem,
    BillList,
    BillFilter,
    BillListFilterPipe,
    ClientItem,
    ClientList,
    ClientFilter,
    ClientListFilterPipe,
    ExerciseItem,
    ExerciseList,
    ExerciseListFilterPipe,
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

    // pages - common
    LoginPage,
    SettingsPage,
    NotificationListPage,

    // pages - admin
    BillListPage,
    ClientCreateModal,
    ClientDetailPage,
    ClientDetailAccessModal,
    ClientDetailBillingModal,
    ClientDetailProfileModal,
    ClientDetailWorkoutsModal,
    ClientListPage,
    ExerciseListPage,
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
    TrainingSchedulerPage,
    TrainingSchedulerFormModal,

    // pages - trainer
    TrainingListTrainerPage,

    // pages - client
    TrainingListClientPage,
    TrainingReserveModal,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FirebaseModule,
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

    // common
    LoginPage,
    SettingsPage,
    NotificationListPage,

    // admin
    BillListPage,
    ClientCreateModal,
    ClientDetailPage,
    ClientDetailAccessModal,
    ClientDetailBillingModal,
    ClientDetailProfileModal,
    ClientDetailWorkoutsModal,
    ClientListPage,
    ExerciseListPage,
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
    TrainingSchedulerPage,
    TrainingSchedulerFormModal,

    // trainer
    TrainingListTrainerPage,

    // client
    TrainingListClientPage,
    TrainingReserveModal
  ],
  providers: [
    FIREBASE_PROVIDERS,
    // HttpModule,
    Api,
    AuthService,
    ExerciseService,
    PlaceService,
    WorkoutService,
    // TrainerService,

    BillStore,
    ClientStore,
    ExerciseStore,
    PlaceStore,
    TrainerStore,
    NotificationStore,
    UserStore,
    WorkoutStore,
    Utils
  ]
})
export class AppModule {}
