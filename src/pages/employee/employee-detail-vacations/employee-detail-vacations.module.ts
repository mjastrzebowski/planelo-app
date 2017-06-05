import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmployeeDetailVacationsPage } from './employee-detail-vacations';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    EmployeeDetailVacationsPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployeeDetailVacationsPage)
  ],
  exports: [
    EmployeeDetailVacationsPage
  ],
  entryComponents: [
    EmployeeDetailVacationsPage
  ]
})
export class EmployeeDetailVacationsModule {}
