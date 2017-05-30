import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { LoginPage } from './login';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LoginPage)
  ],
  exports: [
    LoginPage
  ]
})
export class CommonLoginModule {}
