import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SessionCreatePage } from './session-create';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    SessionCreatePage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SessionCreatePage)
  ],
  exports: [
    SessionCreatePage
  ],
  entryComponents: [
    SessionCreatePage
  ]
})
export class SessionCreateModule {}
