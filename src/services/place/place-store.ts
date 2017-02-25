import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';

import { IPlace, Place } from './place';
import { PlaceService } from './place-service';

@Injectable()
export class PlaceStore extends BaseStore {
  constructor(
    private placeService: PlaceService
  ) {
    super(placeService);
    this.init();
  }
}
