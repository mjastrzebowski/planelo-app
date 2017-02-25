import { Component, Input } from '@angular/core';

import { ClientStore } from 'app/services/client/client-store';
import { PlaceStore } from 'app/services/place/place-store';


@Component({
  selector: 'bill-filter',
  templateUrl: 'bill-filter.html'
})
export class BillFilter {
  @Input() filter: any;
  @Input() limit: any;

  constructor(
    public clientStore: ClientStore,
    public placeStore: PlaceStore
  ) {}
}
