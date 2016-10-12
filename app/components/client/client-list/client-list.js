import { Component, Input, ViewChildren } from '@angular/core';

import { ClientStore } from '../../../core/client/client-store';

import { ClientItem } from '../client-item/client-item';
import { ClientListFilterPipe } from './client-list-filter-pipe';


@Component({
  directives: [
    ClientItem
  ],
  pipes: [
    ClientListFilterPipe
  ],
  selector: 'client-list',
  templateUrl: 'build/components/client/client-list/client-list.html'
})
export class ClientList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('clients') clients: any;

  constructor(public clientStore: ClientStore) {
    this.clients = [];
  }
}
