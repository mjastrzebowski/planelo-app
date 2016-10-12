import { Injectable, Component, ViewChild } from '@angular/core';
import { App, LoadingController } from 'ionic-angular';

import { NotificationService } from '../core/notification/notification-service';

@Injectable()
export class Utils {

  constructor(public app: App, public loadingCtrl: LoadingController, public notificationService: NotificationService) {
    this.nav = app.getActiveNav();
    this.active = false;

    this.weekdays = [
      'poniedziałek',
      'wtorek',
      'środa',
      'czwartek',
      'piątek',
      'sobota',
      'niedziela'
    ];
  }

  createNotification(type, data) {
    this.notificationService.createNotification(type, data);
  }

  presentLoading(message, duration) {
    // console.log('present loading', this.nav);
    this.active = true;
    if (this.loading) {
      return;
    }

    let options = {
      content: message || 'Proszę czekać...' //,
      // dismissOnPageChange: true
    };

    if (duration) {
      options.duration = duration;
    }

    // console.log('present loading create');
    this.loading = this.loadingCtrl.create(options);
    // console.log('present loading start');
    this.loading.present();
    
  }

  stopLoading(force) {
    // console.log('test stop loading', this.nav.hasOverlay());
    if (this.loading && (force || this.active)) {
      this.loading.dismiss();
    }
    this.loading = null;
    this.active = false;
  }

  generatePassword() {
    let length = 6,
        charset = 'abcdefghjkpqrstuxyz23456789',
        retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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
