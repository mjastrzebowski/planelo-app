import { Component, Input } from '@angular/core';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';


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
