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

// modal pages
import { EmployeeDetailHoursPage } from 'app/pages/employee/employee-detail-hours/employee-detail-hours';

// services
import * as allServices from 'app/services';
export let services = Object.keys(allServices).map(key => {
  allServices[key].key = key;
  return allServices[key];
});


@NgModule({
  declarations: [
    PlaneloApp,
    EmployeeDetailHoursPage
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
    EmployeeDetailHoursPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Utils,
    services
  ]
})
export class AppModule {}
