import { Component, Input, ViewChildren } from '@angular/core';

import { ClientStore } from '../../../core/client/client-store';


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
}
