import { Component, Input } from '@angular/core';
import { App, Modal, NavController } from 'ionic-angular';

import { Utils } from '../../../providers/utils';

import { NotificationCounter } from '../../../components/notification/notification-counter/notification-counter';
import { ClientList } from '../../../components/client/client-list/client-list';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientService } from '../../../core/client/client-service';

import { ClientCreateModal } from '../client-create/client-create';

@Component({
  templateUrl: 'build/pages/client/client-list/client-list.html',
  directives: [
    NotificationCounter,
    ClientList
  ]
})
export class ClientListPage {

  constructor(public app: App, public nav: NavController, public utils: Utils, public auth: AuthService, public clientService: ClientService) {
    this.filter = '';
  }

  showClientCreate() {
    this.modal = Modal.create(ClientCreateModal);

    this.modal.onDismiss(data => {
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
    this.nav.present(this.modal);
  }
}
