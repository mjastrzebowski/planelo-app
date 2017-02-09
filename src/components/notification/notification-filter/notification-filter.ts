import { Component, Input } from '@angular/core';

import { ClientStore } from 'app/core/client/client-store';
import { PlaceStore } from 'app/core/place/place-store';
import { TrainerStore } from 'app/core/trainer/trainer-store';


@Component({
  selector: 'notification-filter',
  templateUrl: 'notification-filter.html'
})
export class NotificationFilter {
  @Input() filter: any;
  @Input() limit: any;

  constructor(
    public clientStore: ClientStore,
    public placeStore: PlaceStore,
    public trainerStore: TrainerStore
  ) {}
}
