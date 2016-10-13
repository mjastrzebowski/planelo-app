import { provide } from '@angular/core';
import { FIREBASE_TRAINERS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { TrainerService } from './trainer-service';
import { TrainerStore } from './trainer-store';


export const TRAINER_PROVIDERS: any[] = [
  {
    provide: TrainerService,
    deps: [AuthService],
    useFactory: (auth: AuthService): TrainerService => {
      return new TrainerService(new Firebase(`${FIREBASE_TRAINERS_URL}`));
    }
  }, {
    provide: TrainerStore,
    deps: [AuthService],
    useFactory: (auth: AuthService): TrainerStore => {
      return new TrainerStore(new Firebase(`${FIREBASE_TRAINERS_URL}`));
    }
  }
];
