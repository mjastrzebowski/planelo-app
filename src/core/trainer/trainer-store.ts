import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { ITrainer, Trainer } from './trainer';
import { AuthService } from 'app/core/auth/auth-service';

@Injectable()
export class TrainerStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public list: List<any> = List();

  constructor(
    private auth: AuthService
  ) {
    this.auth.get({ filter: { where: { isTrainer: true }, include: 'hours' }}).then(data => {
      this.list = List(data);
      this.list.forEach(trainer => {
        trainer.title = trainer.name + ' ' + trainer.lastname;
        trainer.days = [];
        trainer.hours.forEach(hour => {
          if (!trainer.days.hasOwnProperty(hour.day)) {
            trainer.days[hour.day] = [];
          }
          trainer.days[hour.day].push(hour);
        });
      });
      this.loaded = true;
      this.emit();
    });
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

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.loaded);
  }

  get size(): number {
    return this.list.size;
  }

  get(): List<ITrainer[]> {
    return this.list;
  }

  getItem(id: number): ITrainer {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  getItemByKey(key: string): ITrainer {
    let index = this.findIndexByKey(key);
    return this.list.get(index);
  }

  getItemByUsername(username: string): ITrainer {
    let index = this.findIndexByUsername(username);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  filterBy(filters: any): any {
    return this.list.filter(trainer => {
      let check = true;
      Object.keys(filters).forEach(function (key) {
        switch (key) {
          case 'availableFrom': {
            if (trainer.fullDate >= filters[key]) {
              check = false;
            }
            break;
          }
          case 'availableTo': {
            if (trainer.fullDate < filters[key]) {
              check = false;
            }
            break;
          }
          default: {
            if (trainer[key] !== filters[key]) {
              check = false;
            }
            break;
          }
        }

        if (!check) {
          return false;
        }
      });
      return check;
    });
  }

  private findIndex(id: number): number {
    return this.list.findIndex((trainer: ITrainer) => {
      return trainer.id === id;
    });
  }

  private findIndexByKey(key: string): number {
    return this.list.findIndex((trainer: ITrainer) => {
      return trainer.key === key;
    });
  }

  private findIndexByUsername(username: string): number {
    return this.list.findIndex((trainer: ITrainer) => {
      return trainer.username === username;
    });
  }
}
