import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { IWorkout } from './workout';

export class WorkoutFullStore {
  workouts: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase, auth: AuthService, public clientStore: ClientStore) {
    this.auth = auth;
    ref = ref.orderByChild('dateTime').startAt('2016-06-01 08:00');
    // ref = ref.orderByChild('dateTime');// .endAt('2016-06-30 08:00');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  private updateWorkoutDependencies(workout: IWorkout): void {
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
      // workout.fullDate = new Date(workout.date).toLocaleDateString('pl', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
      workout.fullDate = moment(new Date(workout.date)).format('dddd, DD.MM.YYYY');
      this.list = this.list.push(workout);
      this.updateWorkoutDependencies(workout);
      this.emit();
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

  findClientWorkoutIndex(clientKey: string, date: string, timeStart: string): number {
    return this.list.findIndex((workout: IWorkout) => {
      return workout.clientKey === clientKey && workout.date === date && workout.timeStart === timeStart;
    });
  }
}
