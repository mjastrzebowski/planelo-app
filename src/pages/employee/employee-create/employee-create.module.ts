import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { EmployeeCreatePage } from './employee-create';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    EmployeeCreatePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(EmployeeCreatePage)
  ],
  exports: [
    EmployeeCreatePage
  ],
  entryComponents: [
    EmployeeCreatePage
  ]
})
export class EmployeeCreateModule {}
