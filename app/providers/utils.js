import { Injectable, Component, ViewChild } from '@angular/core';
import { App, Loading } from 'ionic-angular';

@Injectable()
export class Utils {

  constructor(app: App) {
    // @Inject(Platform) platform
    this.app = app;
    this.nav = app.getActiveNav();
  }

  presentLoading(message, duration) {
    let options = {
      content: message || 'Proszę czekać...'
    };

    if (duration) {
      options.duration = duration;
    }

    this.loading = Loading.create(options);
    this.nav.present(this.loading);
  }

  stopLoading() {
    this.loading.dismiss();
  }





  // deprecated
  static rewriteString(string) {
    let str = string.toLowerCase();
    let replaceChars = {
      'ę': 'e',
      'ó': 'o',
      'ą': 'a',
      'ś': 's',
      'ł': 'l',
      'ż': 'z',
      'ź': 'z',
      'ć': 'c',
      'ń': 'n'
    };
    /* Replace polish characters */
    str = str.replace(/[ęóąśłżźćń]/g, function(match) { return replaceChars[match]; });

    /* Remove unwanted characters, only accept alphanumeric and space */
    str = str.replace(/[^A-Za-z0-9 ]/g, '');
 
    /* Replace multi spaces with a single space */
    str = str.replace(/\s{2,}/g, ' ');
 
    /* Replace space with a '-' symbol */
    str = str.replace(/\s/g, '-');

    return str;
  }
}
