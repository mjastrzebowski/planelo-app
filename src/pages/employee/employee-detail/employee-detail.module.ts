import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmployeeDetailPage } from './employee-detail';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    EmployeeDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployeeDetailPage)
  ],
  exports: [
    EmployeeDetailPage
  ]
})
export class EmployeeDetailModule {}
