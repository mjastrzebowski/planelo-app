import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

import { IEmployee, Employee } from './employee';
import { EmployeeService } from './employee-service';

import { AuthStore } from 'app/services/auth';

import { EmployeeHourStore } from 'app/services/employee-hour';
// import { CompanyStore } from 'app/services/company/company-store';

@Injectable()
export class EmployeeStore extends BaseStore {
  constructor(
    private employeeService: EmployeeService,
    private baseStream: BaseStream,
    private authStore: AuthStore,
    private employeeHourStore: EmployeeHourStore
    // private companyStore: CompanyStore
  ) {
    super(employeeService, baseStream);
    this.model = 'Employee';
    this.init();

    this.authStore.subscribe(this.refresh.bind(this));
    this.employeeHourStore.subscribe(this.refresh.bind(this));
    // this.companyStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.profile = this.authStore.getItem(item.profileId) || {};
    item.name = item.profile.name + ' ' + item.profile.lastname;
    // item.company = this.companyStore.getItem(item.companyId);

    item.days = [];
    item.hours = this.employeeHourStore.filterBy({ employeeId: item.id });
    item.hours.forEach(hour => {
      if (!item.days.hasOwnProperty(hour.day)) {
        item.days[hour.day] = [];
      }
      item.days[hour.day].push(hour);
    });
    return item;
  }


  updateHours(employeeId: number, days: any) {
    return new Promise((resolve, reject) => {
      days.forEach(day => {
        if (!day) {
          return;
        }
        day.forEach(hour => {
          if (!hour.start || !hour.end) {
            return;
          }
          if (hour.create) {
            this.employeeHourStore.create(hour);
          } else if (hour.delete) {
            this.employeeHourStore.delete(hour.id);
          } else if (hour.update) {
            this.employeeHourStore.update(hour.id, hour);
          }
        });
      });
      resolve();
      // }, (error) => {
      //   reject(error);
      // });
    });
    // this.deleteHours(employeeId).then(() => {
    // });
  }
}
