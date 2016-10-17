import { Component, Input } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { IClient } from '../../../core/client/client';

import { Utils } from '../../../providers/utils';

@Component({
  templateUrl: 'client-detail-access.html'
})
export class ClientDetailAccessModal {
  @Input() client: IClient;
  editing: boolean = false;

  constructor(
    private params: NavParams,
    private viewCtrl: ViewController,
    private utils: Utils
  ) {}

  ngOnInit(): void {
    if (this.params.data.hasOwnProperty('key')) {
      this.editing = true;
      this.client = this.params.data;
    } else {
      this.client = {};
    }
  }

  generatePassword(field): void {
    field.value = '';
    field.type = 'text';
    this.client.password = this.utils.generatePassword();
    this.generateMessage();
  }

  generateMessage(): void {
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

  save(): void {
    this.viewCtrl.dismiss(this.client);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  delete(): void {
    this.client.delete = true;
    this.viewCtrl.dismiss(this.client);
  }
}
