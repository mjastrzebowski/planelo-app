import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IHour, Hour } from './hour';
import { HourService } from './hour-service';

@Injectable()
export class HourStore extends BaseStore {
  filter = { filter: { order: ['day', 'start'] }};

  constructor(
    private hourService: HourService,
    private baseStream: BaseStream
  ) {
    super(hourService, baseStream);
    this.model = 'WorkingHour';
    this.init();
  }

  clearItem(item: any) {
    item = super.clearItem(item);
    delete item.create;
    delete item.update;
    delete item.delete;
    return item;
  }
}
