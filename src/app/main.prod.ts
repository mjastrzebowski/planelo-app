// import { platformBrowser } from '@angular/platform-browser';
// import { enableProdMode } from '@angular/core';

// import { AppModuleNgFactory } from './app.module.ngfactory';

// enableProdMode();
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { AppModule } from './app.module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
