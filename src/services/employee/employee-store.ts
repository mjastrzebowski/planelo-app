import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IEmployee, Employee } from './employee';
import { EmployeeService } from './employee-service';

import { AuthStore } from 'app/services/auth/auth-store';
// import { CompanyStore } from 'app/services/company/company-store';

@Injectable()
export class EmployeeStore extends BaseStore {
  constructor(
    private employeeService: EmployeeService,
    private baseStream: BaseStream,
    private authStore: AuthStore
    // private companyStore: CompanyStore
  ) {
    super(employeeService, baseStream);
    this.model = 'Employee';
    this.init();

    this.authStore.subscribe(this.refresh.bind(this));
    // this.companyStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.profile = this.authStore.getItem(item.profileId) || {};
    item.name = item.profile.name + ' ' + item.profile.lastname;
    // item.company = this.companyStore.getItem(item.companyId);
    return item;
  }
}
