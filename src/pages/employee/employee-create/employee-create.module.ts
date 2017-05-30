import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmployeeCreateModal } from './employee-create';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    EmployeeCreateModal
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployeeCreateModal)
  ],
  exports: [
    EmployeeCreateModal
  ]
})
export class EmployeeCreateModule {}
