import { Component, Input } from '@angular/core';

import { ClientStore } from 'app/core/client/client-store';
import { PlaceStore } from 'app/core/place/place-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';


@Component({
  selector: 'client-filter',
  templateUrl: 'client-filter.html'
})
export class ClientFilter {
  @Input() filter: any;
  @Input() limit: any;

  constructor(
    public clientStore: ClientStore,
    public placeStore: PlaceStore,
    public trainerStore: TrainerStore
  ) {}
}
