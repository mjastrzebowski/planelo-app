import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IPlace, Place } from './place';
import { PlaceService } from './place-service';

@Injectable()
export class PlaceStore extends BaseStore {
  constructor(
    private placeService: PlaceService,
    private baseStream: BaseStream
  ) {
    super(placeService, baseStream);
    this.model = 'Place';
    this.init();
  }
}
