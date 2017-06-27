import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

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

  static hoursToDays(hours) {
    let days = [];
    hours.forEach(hour => {
      if (!days.hasOwnProperty(hour.day)) {
        days[hour.day] = [];
      }
      days[hour.day].push(hour);
    });
    return days;
  }

  clearItem(item: any) {
    item = super.clearItem(item);
    delete item.create;
    delete item.update;
    delete item.delete;
    return item;
  }
}
