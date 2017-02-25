import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseStore } from 'app/services/_base/base-store';

import { ITrainer, Trainer } from './trainer';
import { AuthService } from 'app/services/auth/auth-service';

import { HourStore } from 'app/services/hour/hour-store';

@Injectable()
export class TrainerStore extends BaseStore {
  filter = { filter: { where: { isTrainer: true } }};

  constructor(
    private auth: AuthService,
    private hourStore: HourStore
  ) {
    super(auth);
    this.init();
  }

  convertItem(item: any) {
    item.title = item.name + ' ' + item.lastname;
    item.days = [];
    item.hours = this.hourStore.filterBy({ profileId: item.id });
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

  createHour(trainerId: number, hour: any) {
    return this.auth.createHour(trainerId, hour);
  }
  updateHour(trainerId: number, hour: any) {
    return this.auth.updateHour(trainerId, hour);
  }
  deleteHour(trainerId: number, hourId: number) {
    return this.auth.deleteHour(trainerId, hourId);
  }
  deleteHours(trainerId: number) {
    return this.auth.deleteHours(trainerId);
  }
  updateHours(trainerId: number, hours: any) {
    console.log(hours);
      hours.forEach(day => {
        if (!day) {
          return;
        }
        day.forEach(hour => {
          if (!hour.start || !hour.end) {
            return;
          }
          if (hour.create) {
            this.createHour(trainerId, hour);
          } else if (hour.delete) {
            this.deleteHour(trainerId, hour.id);
          } else if (hour.update) {
            this.updateHour(trainerId, hour);
          }
        })
      });
    // this.deleteHours(trainerId).then(() => {
    // });
  }
}
