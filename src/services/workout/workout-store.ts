import { Injectable, EventEmitter } from '@angular/core';

import * as moment from 'moment';
import { List } from 'immutable';

import { Utils } from 'app/providers/utils';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';
import { AuthService } from 'app/services/auth/auth-service';

import { IWorkout, Workout } from './workout';
import { WorkoutService } from './workout-service';

import { TrainerStore } from 'app/services/trainer/trainer-store';

@Injectable()
export class WorkoutStore extends BaseStore {
  filter = { filter: { include: ['place', { client: 'place' }, { trainer: 'place' }, { session: { activity: 'activityType' }}] }};
  private sub;

  constructor(
    private workoutService: WorkoutService,
    private auth: AuthService,
    private utils: Utils,
    private trainerStore: TrainerStore,
    private baseStream: BaseStream
  ) {
    super(workoutService, baseStream);
    this.model = 'Workout';
    this.init();
  }

  ngOnInit(): void {
    this.sub = this.trainerStore.subscribe(loaded => {
      this.refresh();
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  convertItem(item: any) {
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

      let timeArray = item.timeStart.split(':');
      let time = parseInt(timeArray[0], 10);
      let dateArray = item.date.split('-');
      let year = parseInt(dateArray[0], 10);
      let monthStr = dateArray[1];
      let month = parseInt(monthStr, 10) - 1;
      let date = parseInt(dateArray[2], 10);
      item.fullDate = new Date(year, month, date, time);
      if (item.fullDate == 'Invalid Date' || item.fullDate == 'Invalid date') {
        item.fullDate = new Date(year, month, date);
      // item.fullDate = moment(new Date(item.date)).format('dddd, DD.MM.YYYY');
      }
      moment.locale('pl');
      item.weekDay = moment(item.fullDate).format('dddd');
      if (!item.weekDay || item.weekDay == 'Invalid Date' || item.weekDay == 'Invalid date') {
        item.weekDay = item.fullDate.toLocaleDateString('pl', { weekday: 'long' });
      }
      item.descDate = item.weekDay + ', ' + date + '.' + monthStr + '.' + year + ' r.';
      item.clientKey = item.client;
      item.placeKey = item.place;
      item.trainerKey = item.trainer;
      item.completed = (item.completed === 'false') ? false : item.completed;

      // this.listAll = this.listAll.push(item);

      if (item.date === '2099-12-31' || this.auth.isAdmin
        || (this.auth.isTrainer && (this.auth.id === item.trainerId || item.trainer === sunday))
        || (this.auth.isClient && this.auth.id === item.clientId)) {
        return item;
      }
    }
    // return item;
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

  getByClient(clientId: number): List<IWorkout> {
    return this.filterBy({
      clientId: clientId
    });
  }

  findClientWorkoutIndex(clientKey: string, date: string, timeStart: string): number {
    return this.list.findIndex((workout: IWorkout) => {
      return workout.clientKey === clientKey && workout.date === date && workout.timeStart === timeStart;
    });
  }


  getAvailableHours() {
    return this.get();
  }
}
