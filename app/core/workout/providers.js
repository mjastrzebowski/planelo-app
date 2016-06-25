import { provide } from '@angular/core';
import { FIREBASE_CLIENTS_URL, FIREBASE_PLACES_URL, FIREBASE_TRAINERS_URL, FIREBASE_WORKOUTS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { ClientStore } from '../../core/client/client-store';
import { PlaceStore } from '../../core/place/place-store';
import { TrainerStore } from '../../core/trainer/trainer-store';

import { WorkoutService } from './workout-service';
import { WorkoutStore } from './workout-store';
import { WorkoutFullStore } from './workout-full-store';

export const WORKOUT_PROVIDERS: any[] = [
  provide(WorkoutService, {
    deps: [AuthService],
    useFactory: (auth: AuthService): WorkoutService => {
      return new WorkoutService(new Firebase(`${FIREBASE_WORKOUTS_URL}`));
    }
  }),

  provide(WorkoutStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): WorkoutStore => {
      let clientStore = new ClientStore(new Firebase(`${FIREBASE_CLIENTS_URL}`));
      let placeStore = new PlaceStore(new Firebase(`${FIREBASE_PLACES_URL}`));
      let trainerStore = new TrainerStore(new Firebase(`${FIREBASE_TRAINERS_URL}`));
      return new WorkoutStore(new Firebase(`${FIREBASE_WORKOUTS_URL}`), auth, clientStore, placeStore, trainerStore);
    }
  }),

  provide(WorkoutFullStore, {
    deps: [AuthService],
    useFactory: (auth: AuthService): WorkoutFullStore => {
      let clientStore = new ClientStore(new Firebase(`${FIREBASE_CLIENTS_URL}`));
      let placeStore = new PlaceStore(new Firebase(`${FIREBASE_PLACES_URL}`));
      let trainerStore = new TrainerStore(new Firebase(`${FIREBASE_TRAINERS_URL}`));
      return new WorkoutFullStore(new Firebase(`${FIREBASE_WORKOUTS_URL}`), auth, clientStore, placeStore, trainerStore);
    }
  })
];
