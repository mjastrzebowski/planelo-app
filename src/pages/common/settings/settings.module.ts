import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    SettingsPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SettingsPage)
  ],
  exports: [
    SettingsPage
  ]
})
export class CommonSettingsModule {}
