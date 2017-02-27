import { Injectable } from '@angular/core';
import { App, LoadingController, ToastController } from 'ionic-angular';

@Injectable()
export class Utils {
  private nav;
  private active;
  private weekdays;
  private loading;

  constructor(
    private app: App,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.nav = app.getActiveNav();
    this.active = false;

    this.weekdays = [
      'niedziela',
      'poniedziałek',
      'wtorek',
      'środa',
      'czwartek',
      'piątek',
      'sobota'
    ];
  }

  showLoading(message: string, duration?: number): void {
    this.active = true;
    if (this.loading) {
      return;
    }

    let options = {
      content: message || 'Proszę czekać...',
      duration: duration
    };
    this.loading = this.loadingCtrl.create(options);
    this.loading.present();
  }

  stopLoading(force?: boolean): void {
    if (this.loading && (force || this.active)) {
      this.loading.dismiss();
    }
    this.loading = null;
    this.active = false;
  }

  showMessage(message: string, duration?: number): void {
    let options = {
      message: message,
      duration: duration || 3000
    };
    this.toastCtrl.create(options).present();
  }

  generatePassword(): string {
    let length = 6;
    let charset = 'abcdefghjkpqrstuxyz23456789';
    let retVal = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  static forEachDay = function(startDate, endDate) {
    let dates = [];
    let currDate = startDate.clone().startOf('day');
    let lastDate = endDate.clone().startOf('day');
    dates.push(currDate.clone());  // include today
    while (currDate.add(1, 'days').diff(lastDate) < 0) {
      dates.push(currDate.clone());
    }
    return dates;
  };

  static clone = function (object) {
    return JSON.parse(JSON.stringify(object));
  }

  // deprecated
  static rewriteString(string: string): string {
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
