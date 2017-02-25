import { Component, Input } from '@angular/core';

import { ClientStore } from 'app/services/client/client-store';
import { PlaceStore } from 'app/services/place/place-store';
import { TrainerStore } from 'app/services/trainer/trainer-store';


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
