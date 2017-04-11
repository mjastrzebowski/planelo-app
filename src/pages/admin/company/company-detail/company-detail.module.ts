import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { CompanyDetailPage } from './company-detail';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    CompanyDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CompanyDetailPage)
  ],
  exports: [
    CompanyDetailPage
  ]
})
export class AdminCompanyDetailModule {}
