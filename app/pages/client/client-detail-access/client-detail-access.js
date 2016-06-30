import { Component, Input } from '@angular/core';
import { App, NavParams, ViewController } from 'ionic-angular';

import { IClient } from '../../../core/client/client';

import { Utils } from '../../../providers/utils';

@Component({
  templateUrl: 'build/pages/client/client-detail-access/client-detail-access.html'
})
export class ClientDetailAccessModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(app: App, params: NavParams, viewCtrl: ViewController, utils: Utils) {
    this.app = app;
    this.params = params;
    this.viewCtrl = viewCtrl;
    this.utils = utils;
  }

  ionViewLoaded() {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
    }
  }

  generatePassword(field) {
    field.value = '';
    field.type = 'text';
    this.client.password = this.utils.generatePassword();
    this.generateMessage();
  }

  generateMessage() {
    this.client.message = "Witaj!\r\n"
      + "Konto w systemie do zarządzania terminami Twoich treningów zostało utworzone.\r\n"
      + "\r\n"
      + "Aplikacja dostępna jest pod adresem http://treningi.egobody.pl\r\n"
      + "Użytkownik: " + this.client.username + "\r\n"
      + "Hasło: " + this.client.password + "\r\n"
      + "\r\n"
      + "PS. Trwają jeszcze ostatnie testy na urządzeniach mobilnych, więc w przypadku problemów z działaniem systemu, proszę skorzystać z aplikacji na komputerze.\r\n"
      + "\r\n"
      + "Ze sportowym pozdrowieniem!\r\n"
      + "Zespół Egobody";
  }

  save() {
    this.viewCtrl.dismiss(this.client);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this.client.delete = true;
    this.viewCtrl.dismiss(this.client);
  }
}
