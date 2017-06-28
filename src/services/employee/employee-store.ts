import { Injectable } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

import { Utils } from 'app/providers/utils';
import { IEmployee, Employee } from './employee';
import { EmployeeService } from './employee-service';

import { AuthStore } from 'app/services/auth';

import { EmployeeHourStore } from 'app/services/employee-hour';
import { EmployeeVacationStore } from 'app/services/employee-vacation';
import { ProfileSessionStore } from 'app/services/profile-session';

@Injectable()
export class EmployeeStore extends BaseStore {
  constructor(
    private employeeService: EmployeeService,
    private baseStream: BaseStream,
    private authStore: AuthStore,
    private employeeHourStore: EmployeeHourStore,
    private employeeVacationStore: EmployeeVacationStore,
    private profileSessionStore: ProfileSessionStore
  ) {
    super(employeeService, baseStream);
    this.model = 'Employee';
    this.init();

    this.authStore.subscribe(this.refresh.bind(this));
    this.employeeHourStore.subscribe(this.refresh.bind(this));
    this.employeeVacationStore.subscribe(this.refresh.bind(this));
    this.profileSessionStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.profile = this.authStore.getItem(item.profileId) || {};
    item.name = item.profile.name + ' ' + item.profile.lastname;

    item.vacations = this.employeeVacationStore.filterBy({ employeeId: item.id });
    item.sessions = this.profileSessionStore.filterBy({ employeeId: item.id });

    item.hours = this.employeeHourStore.filterBy({ employeeId: item.id });
    item.days = EmployeeHourStore.hoursToDays(item.hours);
    return item;
  }

  newProfile(item: any) {
    if (item.email) {
      item.password = Utils.generatePassword();
      // item.username = 'fake-' + Utils.generatePassword();
    }
    return this.authStore.create(item).then((user) => {
      let employee = {
        companyId: item.companyId,
        profileId: user.id
      };
      return this.create(employee);
    }).catch((err) => {
      console.log('profile not created: ', err);
    });
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
    });
  }

  updateVacations(employeeId: number, vacations: any) {
    return new Promise((resolve, reject) => {
      vacations.forEach(vacation => {
        if (!vacation.start || !vacation.end) {
          return;
        }
        if (vacation.create) {
          this.employeeVacationStore.create(vacation);
        } else if (vacation.delete) {
          this.employeeVacationStore.delete(vacation.id);
        } else if (vacation.update) {
          this.employeeVacationStore.update(vacation.id, vacation);
        }
      });
      resolve();
    });
  }
}
