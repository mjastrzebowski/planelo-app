import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { IWorkout } from './workout';

export class WorkoutStore {
  workouts: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase, auth: AuthService) {
    this.auth = auth;
    // ref = ref.orderByChild('dateTime').startAt('2016-05-31 08:00');
    ref = ref.orderByChild('dateTime'); // .startAt('2016-05-01 08:00'); //.endAt('2016-06-27 08:00');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): IWorkout {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  public filterBy(filters: object): IWorkout {
    return this.list.filter(workout => {
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

  private emit(): void {
    this.trainers.next(this.list);
  }

  private updateWorkoutDependencies(workout: IWorkout): void {
    var timeArray = workout.timeStart.split(':');
    var time = timeArray[0];
    var dateArray = workout.date.split('-');
    var year = dateArray[0];
    var month = parseInt(dateArray[1], 10) - 1;
    var date = dateArray[2];
    // var _entryDate = new Date(year, month, date, time);

    // workout.fullDate = new Date(workout.date + ' ' + workout.timeStart);
    workout.fullDate = new Date(year, month, date, time);
    if (workout.fullDate == 'Invalid Date' || workout.fullDate == 'Invalid date') {
      workout.fullDate = new Date(year, month, date);
    }
    // workout.descDate = workout.fullDate.toLocaleDateString('pl', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
    workout.descDate = moment(workout.fullDate).format('dddd, DD.MM.YYYY');
    workout.weekDay = moment(workout.fullDate).format('dddd');
    if (workout.descDate == 'Invalid Date' || workout.descDate == 'Invalid date') {
      workout.descDate = workout.fullDate.toLocaleDateString('pl', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
      workout.weekDay = workout.fullDate.toLocaleDateString('pl', { weekday: 'long' });
    }

    workout.clientKey = workout.client;
    workout.placeKey = workout.place;
    workout.trainerKey = workout.trainer;
  }

  private emit(): void {
    this.workouts.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let val = snapshot.val();
      let workout: IWorkout = val;
      workout.key = key;
      let sunday = '';

      if (this.auth.isTrainer) {
        let sun1 = '-KGr0KKyDpE2JpoOBsgz';
        let sun2 = '-KJ3OEmcSe2FUq49ehA6';
        let place1 = '-KBHukjV0l8M-EkpTdI4';
        let place2 = '-KBHulP5PtV-dGxyXPWl';
        if (this.auth.place === place1) {
          sunday = sun1;
        } else {
          sunday = sun2;
        }
      }

      if (workout.date === '2099-12-31' || this.auth.isOwner
        || (this.auth.isTrainer && (this.auth.key === workout.trainer || workout.trainer === sunday))
        || (this.auth.isClient && this.auth.key === workout.client)) {
        this.list = this.list.push(workout);
        this.updateWorkoutDependencies(workout);
        this.emit();
      }
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let workout: IWorkout = snapshot.val();
      workout.key = key;
      this.list = this.list.set(index, workout);
      this.updateWorkoutDependencies(workout);
      this.emit();
    }
  }

  private findIndex(key: string): number {
    return this.list.findIndex((workout: IWorkout) => {
      return workout.key === key;
    });
  }
}
