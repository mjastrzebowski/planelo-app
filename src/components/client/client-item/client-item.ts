import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { IClient } from '../../../core/client/client';
import { ClientService } from '../../../core/client/client-service';

import { ClientDetailPage } from '../../../pages/client/client-detail/client-detail';


@Component({
  selector: 'client-item',
  templateUrl: 'client-item.html'
})
export class ClientItem {
  @Input() model: IClient;

  constructor(
    private app: App,
    private clientService: ClientService
  ) {}

  delete(): void {
    this.clientService.deleteClient(this.model);
  }

  goToClientDetail(client) {
    this.nav = this.app.getActiveNav();
    this.nav.push(ClientDetailPage, client);
  }
}
