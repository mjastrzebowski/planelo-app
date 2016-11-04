import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientStore } from '../../../core/client/client-store';

import { NotificationStore } from '../../../core/notification/notification-store';

import { ClientCreateModal } from '../client-create/client-create';

@Component({
  templateUrl: 'client-list.html'
})
export class ClientListPage {
  private modal;
  public filter;

  constructor(
    private modalCtrl: ModalController,
    private notificationStore: NotificationStore,
    private auth: AuthService,
    private clientStore: ClientStore
  ) {
    this.filter = '';
  }

  showClientCreate() {
    this.modal = this.modalCtrl.create(ClientCreateModal);

    this.modal.onDidDismiss(data => {
      if (data) {
        this.clientStore.createClient(
          data.name || '',
          data.lastname || '',
          data.email || '',
          data.phone || '',
          data.comment || '')
          .then((res) => {
            this.notificationStore.createNotification('clientAdded', {
              client: {
                key: res.getKey(),
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
