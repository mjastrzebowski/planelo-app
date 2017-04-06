import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IEmployee, Employee } from './employee';
import { EmployeeService } from './employee-service';

@Injectable()
export class EmployeeStore extends BaseStore {
  constructor(
    private employeeService: EmployeeService,
    private baseStream: BaseStream
  ) {
    super(employeeService, baseStream);
    this.model = 'Employee';
    this.init();
  }

  // convertItem(item: any) {
  //   item = super.convertItem(item);
  //   return item;
  // }
}
