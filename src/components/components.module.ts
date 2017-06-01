import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

// components
import * as allComponents from 'app/components';
export let components = Object.keys(allComponents).map(key => {
  allComponents[key].key = key;
  return allComponents[key];
});


@NgModule({
  declarations: [
    components
  ],
  exports: [
    components
  ],
  imports: [
    IonicModule
  ]
})
export class ComponentsModule {}
