import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

import { ICompany, Company } from './company';
import { CompanyService } from './company-service';

import { EmployeeStore } from 'app/services/employee';

@Injectable()
export class CompanyStore extends BaseStore {
  constructor(
    private companyService: CompanyService,
    private baseStream: BaseStream,
    private employeeStore: EmployeeStore
  ) {
    super(companyService, baseStream);
    this.model = 'Company';
    this.init();

    this.employeeStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.employees = this.employeeStore.filterBy({ companyId: item.id });
    return item;
  }
}
