import { Component, Input } from '@angular/core';
import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ClientStore } from '../../../core/client/client-store';
import { PlaceStore } from '../../../core/place/place-store';
import { TrainerStore } from '../../../core/trainer/trainer-store';


@Component({
  selector: 'notification-filter',
  templateUrl: 'notification-filter.html'
})
export class NotificationFilter {
  @Input() filter: any;
  @Input() limit: any;

  constructor(public clientStore: ClientStore, public placeStore: PlaceStore, public trainerStore: TrainerStore) {}
}
