import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
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
