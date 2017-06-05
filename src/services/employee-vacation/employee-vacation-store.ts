import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

import { IEmployeeVacation, EmployeeVacation } from './employee-vacation';
import { EmployeeVacationService } from './employee-vacation-service';

@Injectable()
export class EmployeeVacationStore extends BaseStore {
  filter = { filter: { order: ['start'] }};

  constructor(
    private employeeVacationService: EmployeeVacationService,
    private baseStream: BaseStream
  ) {
    super(employeeVacationService, baseStream);
    this.model = 'EmployeeVacation';
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
