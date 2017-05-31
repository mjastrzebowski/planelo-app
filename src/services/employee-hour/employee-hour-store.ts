import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IEmployeeHour, EmployeeHour } from './employee-hour';
import { EmployeeHourService } from './employee-hour-service';

@Injectable()
export class EmployeeHourStore extends BaseStore {
  filter = { filter: { order: ['day', 'start'] }};

  constructor(
    private employeeHourService: EmployeeHourService,
    private baseStream: BaseStream
  ) {
    super(employeeHourService, baseStream);
    this.model = 'EmployeeHour';
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
