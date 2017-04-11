import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompanyListPage } from './company-list';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    CompanyListPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CompanyListPage)
  ],
  exports: [
    CompanyListPage
  ]
})
export class AdminCompanyListModule {}
