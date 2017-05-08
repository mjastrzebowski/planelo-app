import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ClientDetailPage } from './client-detail';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    ClientDetailPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ClientDetailPage)
  ],
  exports: [
    ClientDetailPage
  ]
})
export class ClientDetailModule {}
