import { Injectable, Component, ViewChild } from '@angular/core';
import { App, Loading } from 'ionic-angular';

import { NotificationStore } from '../core/notification/notification-store';
import { NotificationService } from '../core/notification/notification-service';

@Injectable()
export class Utils {

  constructor(app: App, notificationStore: NotificationStore, notificationService: NotificationService) {
    // @Inject(Platform) platform
    this.app = app;
    this.nav = app.getActiveNav();
    this.active = false;

    this.notificationStore = notificationStore;
    this.notificationService = notificationService;

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
    this.loading = Loading.create(options);
    // console.log('present loading start');
    this.nav.present(this.loading);
    
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
