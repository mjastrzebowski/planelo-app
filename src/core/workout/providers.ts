import { FIREBASE_WORKOUTS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { WorkoutService } from './workout-service';
import { WorkoutStore } from './workout-store';
import { WorkoutFullStore } from './workout-full-store';

export const WORKOUT_PROVIDERS: any[] = [
  {
    provide: WorkoutService,
    deps: [
      AuthService
    ],
    useFactory: (auth: AuthService): WorkoutService => {
      return new WorkoutService(new Firebase(`${FIREBASE_WORKOUTS_URL}`));
    }
  }, {
    provide: WorkoutStore,
    deps: [
      AuthService
    ],
    useFactory: (auth: AuthService): WorkoutStore => {
      return new WorkoutStore(new Firebase(`${FIREBASE_WORKOUTS_URL}`), auth);
    }
  }, {
    provide: WorkoutFullStore,
    deps: [
      AuthService
    ],
    useFactory: (auth: AuthService): WorkoutFullStore => {
      return new WorkoutFullStore(new Firebase(`${FIREBASE_WORKOUTS_URL}`), auth);
    }
  }
];
