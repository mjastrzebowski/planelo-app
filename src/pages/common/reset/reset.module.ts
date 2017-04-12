import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ResetPage } from './reset';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    ResetPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ResetPage)
  ],
  exports: [
    ResetPage
  ]
})
export class CommonResetModule {}
