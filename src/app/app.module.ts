import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { PlaneloApp } from './app.component';

import { Utils } from 'app/providers/utils';

// modules
import { ComponentsModule } from 'app/components/components.module';

// services
import * as allServices from 'app/services';

// providers
// import { USER_PROVIDERS } from 'app/services/user/providers';
// import { PLACE_PROVIDERS } from 'app/services/place/providers';
// import { TRAINER_PROVIDERS } from 'app/services/trainer/providers';
// import { WORKOUT_PROVIDERS } from 'app/services/workout/providers';
// import { BILL_PROVIDERS } from 'app/services/bill/providers';

let services = Object.keys(allServices).map(key => {
  allServices[key].key = key;
  return allServices[key];
});


@NgModule({
  declarations: [
    PlaneloApp,
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
    PlaneloApp
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Utils,
    services
  ]
})
export class AppModule {}
