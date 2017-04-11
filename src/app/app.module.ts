import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FIREBASE_PROVIDERS } from 'angularfire2';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DavidApp } from './app.component';

import { FirebaseModule } from '../firebase-module';

import { Utils } from 'app/providers/utils';

// modules
import { ComponentsModule } from 'app/components/components.module';

// services
import { Api } from 'app/services/api/api-service';
import { AuthService } from 'app/services/auth/auth-service';
import { BaseStream } from 'app/services/_base/base-stream';
import { BaseService } from 'app/services/_base/base-service';

import { ActivityService } from 'app/services/activity/activity-service';
import { ActivityTypeService } from 'app/services/activity-type/activity-type-service';
import { CompanyService } from 'app/services/company/company-service';
import { EmployeeService } from 'app/services/employee/employee-service';
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
import { AuthStore } from 'app/services/auth/auth-store';
import { BillStore } from 'app/services/bill/bill-store';
import { ClientStore } from 'app/services/client/client-store';
import { CompanyStore } from 'app/services/company/company-store';
import { EmployeeStore } from 'app/services/employee/employee-store';
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

let services = [
  // HttpModule,
  Api,
  AuthService,
  BaseStream,
  BaseService,

  ActivityService,
  ActivityTypeService,
  CompanyService,
  EmployeeService,
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
  AuthStore,
  BillStore,
  ClientStore,
  CompanyStore,
  EmployeeStore,
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
];

@NgModule({
  declarations: [
    DavidApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    FirebaseModule,
    ComponentsModule,
    IonicModule.forRoot(DavidApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    DavidApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FIREBASE_PROVIDERS,
    services
  ]
})
export class AppModule {}
