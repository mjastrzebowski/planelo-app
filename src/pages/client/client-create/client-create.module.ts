import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ClientCreateModal } from './client-create';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    ClientCreateModal
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ClientCreateModal)
  ],
  exports: [
    ClientCreateModal
  ]
})
export class ClientCreateModule {}
