import { Component, Input } from '@angular/core';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';


@Component({
  selector: 'bill-filter',
  templateUrl: 'build/components/bill/bill-filter/bill-filter.html'
})
export class BillFilter {
  @Input() filter: any;
  @Input() limit: any;

  constructor(public clientStore: ClientStore, public placeStore: PlaceStore) {}
}
