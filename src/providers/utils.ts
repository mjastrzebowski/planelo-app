import { Injectable } from '@angular/core';
import { App, LoadingController } from 'ionic-angular';

@Injectable()
export class Utils {
  private nav;
  private active;
  private weekdays;
  private loading;

  constructor(
    private app: App,
    private loadingCtrl: LoadingController
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

  presentLoading(message: string, duration?: number): void {
    this.active = true;
    if (this.loading) {
      return;
    }

    let options = {
      content: message || 'Proszę czekać...',
      duration: undefined
    };

    if (duration) {
      options.duration = duration;
    }

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

  generatePassword(): string {
    let length = 6;
    let charset = 'abcdefghjkpqrstuxyz23456789';
    let retVal = '';

    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
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
