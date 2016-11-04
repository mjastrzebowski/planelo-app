import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { IClient } from '../../../core/client/client';
import { ClientStore } from '../../../core/client/client-store';

import { ClientDetailPage } from '../../../pages/client/client-detail/client-detail';


@Component({
  selector: 'client-item',
  templateUrl: 'client-item.html'
})
export class ClientItem {
  @Input() model: IClient;

  constructor(
    private app: App,
    private clientStore: ClientStore
  ) {}

  delete(): void {
    this.clientStore.removeClient(this.model);
  }

  goToClientDetail(client) {
    this.nav = this.app.getActiveNav();
    this.nav.push(ClientDetailPage, client);
  }
}
