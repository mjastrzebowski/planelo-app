import {Injectable} from 'angular2/core';
// import {Storage, LocalStorage, Events} from 'ionic/ionic';

@Injectable()
export class Utils {

  constructor() { }

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
