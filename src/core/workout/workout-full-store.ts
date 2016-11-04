import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { IWorkout } from './workout';

import { FIREBASE_WORKOUTS_URL } from '../../config';

@Injectable()
export class WorkoutFullStore {
  private loaded: boolean = false;
  public emitter: EventEmitter<any> = new EventEmitter();
  public workouts: FirebaseListObservable<IWorkout[]>;
  public list: List<any> = List();

  constructor(
    private af: AngularFire,
    private auth: AuthService
  ) {
    this.workouts = this.af.database.list('cal_workouts', {
      query: {
        orderByChild: 'dateTime'
      }
    });
    this.sub = this.workouts.subscribe(list => {
      console.log('full store sub', list);
      
      this.list = List(list);
      this.list.forEach(item => {
        item.key = item.$key;
        item.fullDate = moment(new Date(item.date)).format('dddd, DD.MM.YYYY');
        this.updateWorkoutDependencies(item);
      });
      this.loaded = true;
      this.emit();
    });
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

  private updateWorkoutDependencies(workout: IWorkout): void {
    workout.clientKey = workout.client;
    workout.placeKey = workout.place;
    workout.trainerKey = workout.trainer;
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
