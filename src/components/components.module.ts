import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

// components
import { CommonItem } from 'app/components/common/common-item-list/common-item';
import { CommonItemList } from 'app/components/common/common-item-list/common-item-list';
import { CommonItemFilterPipe } from 'app/components/common/common-item-list/common-item-filter';

import { BillItem } from 'app/components/bill/bill-item/bill-item';
import { BillList } from 'app/components/bill/bill-list/bill-list';
import { BillFilter } from 'app/components/bill/bill-filter/bill-filter';
import { BillListFilterPipe } from 'app/components/bill/bill-list/bill-list-filter-pipe';

import { ClientItem } from 'app/components/client/client-item/client-item';
import { ClientList } from 'app/components/client/client-list/client-list';
import { ClientFilter } from 'app/components/client/client-filter/client-filter';
import { ClientListFilterPipe } from 'app/components/client/client-list/client-list-filter-pipe';

import { CompanyItem } from 'app/components/admin/company/company-item/company-item';
import { CompanyList } from 'app/components/admin/company/company-list/company-list';
import { CompanyListFilterPipe } from 'app/components/admin/company/company-list/company-list-filter-pipe';

import { EmployeeItem } from 'app/components/company/employee/employee-item/employee-item';
import { EmployeeList } from 'app/components/company/employee/employee-list/employee-list';
import { EmployeeListFilterPipe } from 'app/components/company/employee/employee-list/employee-list-filter-pipe';

import { ExerciseItem } from 'app/components/admin/exercise/exercise-item/exercise-item';
import { ExerciseList } from 'app/components/admin/exercise/exercise-list/exercise-list';
import { ExerciseListFilterPipe } from 'app/components/admin/exercise/exercise-list/exercise-list-filter-pipe';
import { ExerciseCategoryItem } from 'app/components/admin/exercise-category/exercise-category-item/exercise-category-item';
import { ExerciseCategoryList } from 'app/components/admin/exercise-category/exercise-category-list/exercise-category-list';

import { FindSelectModal } from 'app/components/common/find-select/find-select';
import { FindSelectFilterPipe } from 'app/components/common/find-select/find-select-filter-pipe';

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


let components = [
  CommonItem,
  CommonItemList,
  CommonItemFilterPipe,

  BillItem,
  BillList,
  BillFilter,
  BillListFilterPipe,
  ClientItem,
  ClientList,
  ClientFilter,
  ClientListFilterPipe,
  CompanyItem,
  CompanyList,
  CompanyListFilterPipe,
  EmployeeItem,
  EmployeeList,
  EmployeeListFilterPipe,
  ExerciseItem,
  ExerciseList,
  ExerciseListFilterPipe,
  ExerciseCategoryItem,
  ExerciseCategoryList,
  FindSelectModal,
  FindSelectFilterPipe,
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
  // GroupHoursPipe
];


@NgModule({
  declarations: [
    components
  ],
  exports: [
    components
  ],
  imports: [
    IonicModule
  ]
})
export class ComponentsModule {}
