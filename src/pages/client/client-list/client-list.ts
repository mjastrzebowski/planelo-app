import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientService } from '../../../core/client/client-service';

import { ClientCreateModal } from '../client-create/client-create';

@Component({
  templateUrl: 'client-list.html'
})
export class ClientListPage {
  private modal;
  public filter;

  constructor(
    private modalCtrl: ModalController,
    private utils: Utils,
    private auth: AuthService,
    private clientService: ClientService
  ) {
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
