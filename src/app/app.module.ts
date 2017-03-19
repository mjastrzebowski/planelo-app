import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FIREBASE_PROVIDERS } from 'angularfire2';

import { IonicApp, IonicModule } from 'ionic-angular';
import { DavidApp } from './app.component';

import { FirebaseModule } from '../firebase-module';

import { Utils } from 'app/providers/utils';

// services
import { Api } from 'app/services/api/api-service';
import { AuthService } from 'app/services/auth/auth-service';
import { BaseStream } from 'app/services/_base/base-stream';
import { BaseService } from 'app/services/_base/base-service';

import { ActivityService } from 'app/services/activity/activity-service';
import { ActivityTypeService } from 'app/services/activity-type/activity-type-service';
import { EquipmentService } from 'app/services/equipment/equipment-service';
import { ExerciseService } from 'app/services/exercise/exercise-service';
import { ExerciseCategoryService } from 'app/services/exercise-category/exercise-category-service';
import { ExerciseCommentService } from 'app/services/exercise-comment/exercise-comment-service';
import { ExerciseEquipmentService } from 'app/services/exercise-equipment/exercise-equipment-service';
import { ExerciseImageService } from 'app/services/exercise-image/exercise-image-service';
import { ExerciseMuscleService } from 'app/services/exercise-muscle/exercise-muscle-service';
import { HourService } from 'app/services/hour/hour-service';
import { MuscleService } from 'app/services/muscle/muscle-service';
import { NotificationService } from 'app/services/notification/notification-service';
import { PlaceService } from 'app/services/place/place-service';
import { ProfileSessionService } from 'app/services/profile-session/profile-session-service';
import { RoutineService } from 'app/services/routine/routine-service';
import { RoutineDayService } from 'app/services/routine-day/routine-day-service';
import { RoutineDayWorkoutService } from 'app/services/routine-day-workout/routine-day-workout-service';
import { SessionService } from 'app/services/session/session-service';
import { WorkoutService } from 'app/services/workout/workout-service';
import { WorkoutExerciseService } from 'app/services/workout-exercise/workout-exercise-service';
import { WorkoutGroupService } from 'app/services/workout-group/workout-group-service';
import { WorkoutGroupTypeService } from 'app/services/workout-group-type/workout-group-type-service';
import { WorkoutSetService } from 'app/services/workout-set/workout-set-service';

// import { TrainerService } from 'app/services/trainer/trainer-service';

import { ActivityStore } from 'app/services/activity/activity-store';
import { ActivityTypeStore } from 'app/services/activity-type/activity-type-store';
import { BillStore } from 'app/services/bill/bill-store';
import { ClientStore } from 'app/services/client/client-store';
import { EquipmentStore } from 'app/services/equipment/equipment-store';
import { ExerciseStore } from 'app/services/exercise/exercise-store';
import { ExerciseCategoryStore } from 'app/services/exercise-category/exercise-category-store';
import { ExerciseCommentStore } from 'app/services/exercise-comment/exercise-comment-store';
import { ExerciseEquipmentStore } from 'app/services/exercise-equipment/exercise-equipment-store';
import { ExerciseImageStore } from 'app/services/exercise-image/exercise-image-store';
import { ExerciseMuscleStore } from 'app/services/exercise-muscle/exercise-muscle-store';
import { HourStore } from 'app/services/hour/hour-store';
import { MuscleStore } from 'app/services/muscle/muscle-store';
import { NotificationStore } from 'app/services/notification/notification-store';
import { PlaceStore } from 'app/services/place/place-store';
import { ProfileSessionStore } from 'app/services/profile-session/profile-session-store';
import { RoutineStore } from 'app/services/routine/routine-store';
import { RoutineDayStore } from 'app/services/routine-day/routine-day-store';
import { RoutineDayWorkoutStore } from 'app/services/routine-day-workout/routine-day-workout-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';
import { SessionStore } from 'app/services/session/session-store';
import { UserStore } from 'app/services/user/user-store';
import { WorkoutStore } from 'app/services/workout/workout-store';
import { WorkoutExerciseStore } from 'app/services/workout-exercise/workout-exercise-store';
import { WorkoutGroupStore } from 'app/services/workout-group/workout-group-store';
import { WorkoutGroupTypeStore } from 'app/services/workout-group-type/workout-group-type-store';
import { WorkoutSetStore } from 'app/services/workout-set/workout-set-store';

// providers
// import { USER_PROVIDERS } from 'app/services/user/providers';
// import { PLACE_PROVIDERS } from 'app/services/place/providers';
// import { TRAINER_PROVIDERS } from 'app/services/trainer/providers';
// import { WORKOUT_PROVIDERS } from 'app/services/workout/providers';
// import { BILL_PROVIDERS } from 'app/services/bill/providers';

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
import { ExerciseCategoryItem } from 'app/components/admin/exercise-category/exercise-category-item/exercise-category-item';
import { ExerciseCategoryList } from 'app/components/admin/exercise-category/exercise-category-list/exercise-category-list';

import { NotificationItem } from 'app/components/notification/notification-item/notification-item';
import { NotificationList } from 'app/components/notification/notification-list/notification-list';
import { NotificationFilter } from 'app/components/notification/notification-filter/notification-filter';
import { NotificationCounter } from 'app/components/notification/notification-counter/notification-counter';
import { NotificationListFilterPipe } from 'app/components/notification/notification-list/notification-list-filter-pipe';

import { RoutineItem } from 'app/components/admin/routine/routine-item/routine-item';
import { RoutineList } from 'app/components/admin/routine/routine-list/routine-list';
import { RoutineListFilterPipe } from 'app/components/admin/routine/routine-list/routine-list-filter-pipe';

import { TrainerItem } from 'app/components/trainer/trainer-item/trainer-item';
import { TrainerList } from 'app/components/trainer/trainer-list/trainer-list';
import { TrainerListFilterPipe } from 'app/components/trainer/trainer-list/trainer-list-filter-pipe';

import { WorkoutItem } from 'app/components/workout/workout-item/workout-item';
import { WorkoutList } from 'app/components/workout/workout-list/workout-list';
import { WorkoutListGroupPipe } from 'app/components/workout/workout-list/workout-list-group-pipe';
import { WorkoutListFilterPipe } from 'app/components/workout/workout-list/workout-list-filter-pipe';

// pages - common
import { ImportPage } from 'app/pages/common/import/import';
import { LoginPage } from 'app/pages/common/login/login';
import { ResetPage } from 'app/pages/common/reset/reset';
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
import { ExerciseCreateModal } from 'app/pages/admin/exercise/exercise-create/exercise-create';
import { ExerciseDetailPage } from 'app/pages/admin/exercise/exercise-detail/exercise-detail';
import { RoutineListPage } from 'app/pages/admin/routine/routine-list/routine-list';
import { RoutineCreateModal } from 'app/pages/admin/routine/routine-create/routine-create';
import { RoutineDetailPage } from 'app/pages/admin/routine/routine-detail/routine-detail';
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

import { WorkoutCreateModal } from 'app/pages/admin/workout/workout-create/workout-create';

// pages - trainer
import { TrainingListTrainerPage } from 'app/pages/trainer/training/training-list/training-list';

// pages - client
import { TrainingListClientPage } from 'app/pages/client/training/training-list/training-list';
import { TrainingReserveModal } from 'app/pages/client/training/training-reserve/training-reserve';
import { WorkoutReserveModal } from 'app/pages/client/workout/workout-reserve/workout-reserve';



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
    ExerciseCategoryItem,
    ExerciseCategoryList,
    NotificationItem,
    NotificationList,
    NotificationFilter,
    NotificationCounter,
    NotificationListFilterPipe,
    RoutineItem,
    RoutineList,
    RoutineListFilterPipe,
    TrainerItem,
    TrainerList,
    TrainerListFilterPipe,
    WorkoutItem,
    WorkoutList,
    WorkoutListGroupPipe,
    WorkoutListFilterPipe,
    GroupHoursPipe,

    // pages - common
    ImportPage,
    LoginPage,
    ResetPage,
    ResetPage,
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
    ExerciseCreateModal,
    ExerciseDetailPage,
    RoutineListPage,
    RoutineCreateModal,
    RoutineDetailPage,
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
    WorkoutCreateModal,

    // pages - trainer
    TrainingListTrainerPage,

    // pages - client
    TrainingListClientPage,
    TrainingReserveModal,
    WorkoutReserveModal
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
    }, {
      links: [
        { component: TrainingListPage, name: 'Treningi', segment: 'trainings' },
        { component: TrainingSchedulerPage, name: 'Grafik', segment: 'scheduler' },
        { component: ClientListPage, name: 'Klienci', segment: 'clients' },
        { component: BillListPage, name: 'Rachunki', segment: 'bills' },
        { component: TrainerListPage, name: 'Trenerzy', segment: 'trainers' },
        { component: ExerciseListPage, name: 'Ćwiczenia', segment: 'exercises' },
        { component: RoutineListPage, name: 'Plany treningowe', segment: 'routines' },
        { component: ImportPage, name: 'Import', segment: 'import' },
        { component: SettingsPage, name: 'Ustawienia', segment: 'settings' },
        { component: LoginPage, name: 'Logowanie', segment: 'login' }
      ]
    })
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    DavidApp,

    // common
    ImportPage,
    LoginPage,
    ResetPage,
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
    ExerciseCreateModal,
    ExerciseDetailPage,
    RoutineListPage,
    RoutineCreateModal,
    RoutineDetailPage,
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
    WorkoutCreateModal,

    // trainer
    TrainingListTrainerPage,

    // client
    TrainingListClientPage,
    TrainingReserveModal,
    WorkoutReserveModal
  ],
  providers: [
    FIREBASE_PROVIDERS,
    // HttpModule,
    Api,
    AuthService,
    BaseStream,
    BaseService,

    ActivityService,
    ActivityTypeService,
    EquipmentService,
    ExerciseService,
    ExerciseCategoryService,
    ExerciseCommentService,
    ExerciseEquipmentService,
    ExerciseImageService,
    ExerciseMuscleService,
    HourService,
    MuscleService,
    NotificationService,
    PlaceService,
    ProfileSessionService,
    // TrainerService,
    SessionService,
    RoutineService,
    RoutineDayService,
    RoutineDayWorkoutService,
    WorkoutService,
    WorkoutExerciseService,
    WorkoutGroupService,
    WorkoutGroupTypeService,
    WorkoutSetService,

    ActivityStore,
    ActivityTypeStore,
    BillStore,
    ClientStore,
    EquipmentStore,
    ExerciseStore,
    ExerciseCategoryStore,
    ExerciseCommentStore,
    ExerciseEquipmentStore,
    ExerciseImageStore,
    ExerciseMuscleStore,
    HourStore,
    MuscleStore,
    NotificationStore,
    PlaceStore,
    ProfileSessionStore,
    RoutineStore,
    RoutineDayStore,
    RoutineDayWorkoutStore,
    SessionStore,
    TrainerStore,
    UserStore,
    WorkoutStore,
    WorkoutExerciseStore,
    WorkoutGroupStore,
    WorkoutGroupTypeStore,
    WorkoutSetStore,
    Utils
  ]
})
export class AppModule {}
