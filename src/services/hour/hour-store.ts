import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';

import { IHour, Hour } from './hour';
import { HourService } from './hour-service';

@Injectable()
export class HourStore extends BaseStore {
  constructor(
    private hourService: HourService
  ) {
    super(hourService);
    this.init();
  }
}
