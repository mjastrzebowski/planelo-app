import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmployeeDetailHoursPage } from './employee-detail-hours';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    EmployeeDetailHoursPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployeeDetailHoursPage)
  ],
  exports: [
    EmployeeDetailHoursPage
  ],
  entryComponents: [
    EmployeeDetailHoursPage
  ]
})
export class EmployeeDetailHoursModule {}
