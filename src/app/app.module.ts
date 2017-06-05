import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PlaneloApp } from './app.component';

// modules
import { ComponentsModule } from 'app/components/components.module';

// providers
import { Utils } from 'app/providers/utils';

// modal only pages
import * as allPages from 'app/pages';
export let modalPages = Object.keys(allPages).map(key => {
  allPages[key].key = key;
  return allPages[key];
});

// services
import * as allServices from 'app/services';
export let services = Object.keys(allServices).map(key => {
  allServices[key].key = key;
  return allServices[key];
});


@NgModule({
  declarations: [
    PlaneloApp,
    modalPages
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ComponentsModule,
    IonicModule.forRoot(PlaneloApp)
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    PlaneloApp,
    modalPages
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Utils,
    services
  ]
})
export class AppModule {}
