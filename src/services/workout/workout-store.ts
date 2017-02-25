import { Injectable, EventEmitter } from '@angular/core';
import * as moment from 'moment';

import { List } from 'immutable';

import { AuthService } from 'app/services/auth/auth-service';

import { IWorkout, Workout } from './workout';
import { WorkoutService } from './workout-service';

@Injectable()
export class WorkoutStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public list: List<any> = List();
  public listAll: List<any> = List();

  constructor(
    private auth: AuthService,
    private workoutService: WorkoutService
  ) {
    this.workoutService.get({ filter: { include: ['place', { client: 'place' }, { trainer: 'place' }, { session: { activity: 'activityType' }}] }}).then(data => {
      this.list = List();
      this.listAll = List();
      data.forEach(item => {
        if (item.date !== '' && item.timeStart !== '') {
          // item.key = item.$key;

          let sunday = '';

          if (this.auth.isTrainer) {
            let sun1 = '-KGr0KKyDpE2JpoOBsgz';
            let sun2 = '-KJ3OEmcSe2FUq49ehA6';
            let place1 = '-KBHukjV0l8M-EkpTdI4';
            // let place2 = '-KBHulP5PtV-dGxyXPWl';
            if (this.auth.place === place1) {
              sunday = sun1;
            } else {
              sunday = sun2;
            }
          }

          this.updateWorkoutDependencies(item);
          this.listAll = this.listAll.push(item);

          if (item.date === '2099-12-31' || this.auth.isAdmin
            || (this.auth.isTrainer && (this.auth.id === item.trainerId || item.trainer === sunday))
            || (this.auth.isClient && this.auth.id === item.clientId)) {
            this.list = this.list.push(item);
          }
        }
      });

      this.loaded = true;
      this.emit();
    });
  }

  createWorkout(
    place: string,
    trainer: string,
    client: string,
    date: string,
    dateTime: string,
    timeStart: string,
    timeEnd: string,
    repeat?: boolean,
    fixed?: boolean
  ) {
    if (!fixed) {
      fixed = false;
    }
    return new Promise((resolve, reject) => {});
    // return this.workouts.push(new Workout(place, trainer, client, date, dateTime, timeStart, timeEnd, repeat, fixed));
  }

  removeWorkout(workout: IWorkout) {
    return new Promise((resolve, reject) => {});
    // return this.workouts.remove(workout.key);
  }

  updateWorkout(workout: IWorkout, changes: any) {
    return new Promise((resolve, reject) => {});
    // return this.workouts.update(workout.key, changes);
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

  get(): List<IWorkout> {
    return this.list;
  }

  getByClient(clientId: number): List<IWorkout> {
    return this.filterBy({
      clientId: clientId
    });
  }

  getItem(key: string): IWorkout {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  filterBy(filters: any): any {
    return this.listAll.filter(workout => {
      let check = true;
      Object.keys(filters).forEach(function (key) {
        switch (key) {
          case 'dateBefore': {
            if (workout.fullDate >= filters[key]) {
              check = false;
            }
            break;
          }
          case 'dateAfter': {
            if (workout.fullDate < filters[key]) {
              check = false;
            }
            break;
          }
          case 'fixed': {
            if ((filters[key] === true && workout[key] !== filters[key])
              || (filters[key] === false && workout[key] && workout[key] !== filters[key])) {
              check = false;
            }
            break;
          }
          default: {
            if (workout[key] !== filters[key]) {
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

  private updateWorkoutDependencies(workout: IWorkout): void {
    let timeArray = workout.timeStart.split(':');
    let time = parseInt(timeArray[0], 10);
    let dateArray = workout.date.split('-');
    let year = parseInt(dateArray[0], 10);
    let monthStr = dateArray[1];
    let month = parseInt(monthStr, 10) - 1;
    let date = parseInt(dateArray[2], 10);

    workout.fullDate = new Date(year, month, date, time);
    if (workout.fullDate == 'Invalid Date' || workout.fullDate == 'Invalid date') {
      workout.fullDate = new Date(year, month, date);
    // workout.fullDate = moment(new Date(workout.date)).format('dddd, DD.MM.YYYY');
    }

    moment.locale('pl');
    workout.weekDay = moment(workout.fullDate).format('dddd');
    if (!workout.weekDay || workout.weekDay == 'Invalid Date' || workout.weekDay == 'Invalid date') {
      workout.weekDay = workout.fullDate.toLocaleDateString('pl', { weekday: 'long' });
    }
    workout.descDate = workout.weekDay + ', ' + date + '.' + monthStr + '.' + year + ' r.';

    workout.clientKey = workout.client;
    workout.placeKey = workout.place;
    workout.trainerKey = workout.trainer;

    workout.completed = (workout.completed === 'false') ? false : workout.completed;
  }

  findIndex(key: string): number {
    return this.list.findIndex((workout: IWorkout) => {
      return workout.key === key;
    });
  }

  findClientWorkoutIndex(clientKey: string, date: string, timeStart: string): number {
    return this.list.findIndex((workout: IWorkout) => {
      return workout.clientKey === clientKey && workout.date === date && workout.timeStart === timeStart;
    });
  }
}
