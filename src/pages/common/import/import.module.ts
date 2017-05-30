import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ImportPage } from './import';

import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [
    ImportPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ImportPage)
  ],
  exports: [
    ImportPage
  ]
})
export class CommonImportModule {}
