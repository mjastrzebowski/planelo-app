import { Component, Input } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';

import { Utils } from '../../../providers/utils';

import { NotificationCounter } from '../../../components/notification/notification-counter/notification-counter';
import { ClientList } from '../../../components/client/client-list/client-list';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientService } from '../../../core/client/client-service';

import { ClientCreateModal } from '../client-create/client-create';

@Component({
  templateUrl: 'client-list.html',
  directives: [
    NotificationCounter,
    ClientList
  ]
})
export class ClientListPage {

  constructor(public app: App, public nav: NavController, public modalCtrl: ModalController, public utils: Utils, public auth: AuthService, public clientService: ClientService) {
    this.filter = '';
  }

  showClientCreate() {
    this.modal = this.modalCtrl.create(ClientCreateModal);

    this.modal.onDidDismiss(data => {
      if (data) {
        this.clientService.createClient(
          data.name || '',
          data.lastname || '',
          data.email || '',
          data.phone || '',
          data.comment || '')
          .then((res) => {
            this.utils.createNotification('clientAdded', {
              client: {
                key: res.key(),
                gender: data.gender || '',
                name: data.name || '',
                lastname: data.lastname || ''
              },
              owner: this.auth.key || true
            });
          });
      }
    });
    this.modal.present();
  }
}
