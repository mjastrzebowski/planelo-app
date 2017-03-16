import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { AuthService } from 'app/services/auth/auth-service';
import { ClientStore } from 'app/services/client/client-store';

import { NotificationStore } from 'app/services/notification/notification-store';

import { ClientCreateModal } from '../client-create/client-create';

@Component({
  templateUrl: 'client-list.html'
})
export class ClientListPage {
  private sub: any;
  filter: any = '';

  constructor(
    private modalCtrl: ModalController,
    private notificationStore: NotificationStore,
    private utils: Utils,
    private auth: AuthService,
    private clientStore: ClientStore
  ) {}

  ngOnInit(): void {
    this.utils.showLoading('Ładowanie klientów...');
    this.sub = this.clientStore.subscribe(loaded => {
      if (!loaded) {
        return;
      }
      this.utils.stopLoading();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  showClientCreate() {
    let modal = this.modalCtrl.create(ClientCreateModal);
    modal.onDidDismiss(data => {
      if (data) {
        this.clientStore.createClient(
          data.name || '',
          data.lastname || '',
          data.email || '',
          data.phone || '',
          data.comment || '')
          .then((res) => {
            this.notificationStore.create({
              type: 'clientAdded',
              client: {
                // key: res.getKey(),
                gender: data.gender || '',
                name: data.name || '',
                lastname: data.lastname || ''
              },
              admin: this.auth.key || true
            });
          });
      }
    });
    modal.present();
  }
}
