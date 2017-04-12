import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { RegisterPage } from './register';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    RegisterPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(RegisterPage)
  ],
  exports: [
    RegisterPage
  ]
})
export class CommonRegisterModule {}
