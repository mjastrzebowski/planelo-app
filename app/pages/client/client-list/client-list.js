import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { App, Modal, Alert, NavController } from 'ionic-angular';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Utils } from '../../../providers/utils';

import { AuthService } from '../../../core/auth/auth-service';
import { ClientService } from '../../../core/client/client-service';
import { ClientStore } from '../../../core/client/client-store';

import { ClientCreateModal } from '../client-create/client-create';
import { ClientDetailPage } from '../client-detail/client-detail';

@Component({
  templateUrl: 'build/pages/client/client-list/client-list.html'
})
export class ClientListPage {
  @Input() clients: ReplaySubject<List<any>>;

  constructor(app: App, nav: NavController, utils: Utils, auth: AuthService, clientService: ClientService, clientStore: ClientStore) {
    this.app = app;
    this.nav = nav;
    this.utils = utils;
    this.auth = auth;

    this.clientService = clientService;
    this.clientStore = clientStore;

    this.queryText = '';
  }

  goToClientDetail(client) {
    this.nav.push(ClientDetailPage, client);
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

  updateList() {
    this.shownSessions = 0;
    let queryText = this.queryText.toLowerCase().replace(/,|\.|-/g,' ');
    let queryWords = queryText.split(' ').filter(w => w.trim().length);

    this.clientStore.list.forEach(client => {
      client.hide = false;
      let matchesQueryText = false;

      if (queryWords.length) {
        // of any query word is in the client name or lastname than it passes the query test
        queryWords.forEach(queryWord => {
          if (client.name.toLowerCase().indexOf(queryWord) > -1 || client.lastname.toLowerCase().indexOf(queryWord) > -1) {
            matchesQueryText = true;
          }
        });
      } else {
        // if there are no query words then this client passes the query test
        matchesQueryText = true;
      }

      if (!matchesQueryText) {
        client.hide = true;
      } else {
        this.shownSessions++;
      }
    });
  }

  ionViewDidEnter() {
    this.utils.presentLoading('Ładowanie klientów...');

    let authSub = this.auth.subscribe((authenticated: boolean) => {
      this.clients = this.clientStore.clients;

      if (authenticated) {
        if (authSub) {
          authSub.unsubscribe();
        }

        if (this.auth.isTrainer || this.auth.isOwner) {
          let clientSub = this.clients.subscribe(() => {
            setTimeout(() => {
              this.shownSessions = true;
              this.utils.stopLoading();
            }, 500);
          });
        }
      }
    });
  }
}
