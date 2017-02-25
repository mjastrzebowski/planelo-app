import { Component, Input, ViewChildren } from '@angular/core';

import { ClientStore } from 'app/services/client/client-store';


@Component({
  selector: 'client-list',
  templateUrl: 'client-list.html'
})
export class ClientList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('clients') clients: any;

  constructor(
    public clientStore: ClientStore
  ) {
    this.clients = [];
  }

  isEmpty() {
    if (this.clients.length) {
      let list = this.clients.filter(client => {
        return !client.model.hide;
      });
      return list.length === 0;
    }
    return this.clients.length;
  }
}
