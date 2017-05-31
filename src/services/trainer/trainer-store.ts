import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { ITrainer, Trainer } from './trainer';
import { AuthService } from 'app/services/auth/auth-service';

import { EmployeeHourStore } from 'app/services/employee-hour/employee-hour-store';

@Injectable()
export class TrainerStore extends BaseStore {
  filter = { filter: { where: { isTrainer: true } }};

  constructor(
    private auth: AuthService,
    private employeeHourStore: EmployeeHourStore,
    private baseStream: BaseStream
  ) {
    super(auth, baseStream);
    this.model = 'Profile';
    this.init();

    this.employeeHourStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.title = item.name + ' ' + item.lastname;
    item.days = [];
    item.hours = this.employeeHourStore.filterBy({ profileId: item.id });
    item.hours.forEach(hour => {
      if (!item.days.hasOwnProperty(hour.day)) {
        item.days[hour.day] = [];
      }
      item.days[hour.day].push(hour);
    });
    return item;
  }

  createTrainer(title: string, email: string, hours: any) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.push(new Trainer(title, email, hours));
  }
  removeTrainer(trainer: ITrainer) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.remove(trainer.key);
  }
  updateTrainer(trainer: ITrainer, changes: any) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.update(trainer.key, changes);
  }

  updateHours(trainerId: number, days: any) {
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
    // this.deleteHours(trainerId).then(() => {
    // });
  }
}
