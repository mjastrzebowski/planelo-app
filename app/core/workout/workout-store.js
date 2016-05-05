import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';

import { AuthService } from '../../core/auth/auth-service';

import { ClientStore } from '../../core/client/client-store';
import { PlaceStore } from '../../core/place/place-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { IWorkout } from './workout';

export class WorkoutStore {
  workouts: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase, auth: AuthService, public clientStore: ClientStore, public placeStore: PlaceStore, public trainerStore: TrainerStore) {
    this.auth = auth;
    ref = ref.orderByChild('dateTime'); //.startAt('2016-04-26 08:00').limitToFirst(300);
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  private updateClients(): void {
    this.list.forEach((workout, index) => {
      let client = this.clientStore.getItem(workout.clientKey);
      workout.client = client.name + ' ' + client.lastname;
      this.list = this.list.set(index, workout);
    }, this);
  }

  private updatePlaces(): void {
    this.list.forEach((workout, index) => {
      let place = this.placeStore.getItem(workout.placeKey);
      workout.place = place.title;
      this.list = this.list.set(index, workout);
    }, this);
  }

  private updateTrainers(): void {
    this.list.forEach((workout, index) => {
      let trainer = this.trainerStore.getItem(workout.trainerKey);
      workout.trainer = trainer.title;
      this.list = this.list.set(index, workout);
    }, this);
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
    if (workout.descDate == 'Invalid Date' || workout.descDate == 'Invalid date') {
      workout.descDate = workout.fullDate.toLocaleDateString('pl', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    workout.clientKey = workout.client;
    workout.placeKey = workout.place;
    workout.trainerKey = workout.trainer;

    this.updateClients();
    this.clientStore.clients.subscribe(() => {
      this.updateClients();
      // this.emit();
    });

    this.updatePlaces();
    this.placeStore.places.subscribe(() => {
      this.updatePlaces();
      // this.emit();
    });

    this.updateTrainers();
    this.trainerStore.trainers.subscribe(() => {
      this.updateTrainers();
      // this.emit();
    });
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

      if (this.auth.isOwner
        || (this.auth.isTrainer && (this.auth.key === workout.trainer || workout.trainer === '-KGr0KKyDpE2JpoOBsgz'))
        || (this.auth.isClient && this.auth.key === workout.client)) {
        this.list = this.list.push(workout);
        this.updateWorkoutDependencies(workout);
      }
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
}
