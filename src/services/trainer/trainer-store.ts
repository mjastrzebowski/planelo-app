import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseStore } from 'app/services/_base/base-store';

import { ITrainer, Trainer } from './trainer';
import { AuthService } from 'app/services/auth/auth-service';

import { HourStore } from 'app/services/hour/hour-store';

@Injectable()
export class TrainerStore extends BaseStore {
  filter = { filter: { where: { isTrainer: true } }};
  private sub;

  constructor(
    private auth: AuthService,
    private hourStore: HourStore
  ) {
    super(auth);
    this.init();
    this.sub = this.hourStore.subscribe(loaded => {
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
            this.hourStore.create(hour);
          } else if (hour.delete) {
            this.hourStore.delete(hour.id);
          } else if (hour.update) {
            this.hourStore.update(hour.id, hour);
          }
        })
      });
    // this.deleteHours(trainerId).then(() => {
    // });
  }
}
