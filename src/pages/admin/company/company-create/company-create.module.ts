import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompanyCreateModal } from './company-create';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    CompanyCreateModal
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CompanyCreateModal)
  ],
  exports: [
    CompanyCreateModal
  ]
})
export class AdminCompanyCreateModule {}
