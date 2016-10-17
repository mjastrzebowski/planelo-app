import { FIREBASE_TRAINERS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { TrainerService } from './trainer-service';
import { TrainerStore } from './trainer-store';

export function trainerServiceFactory(auth: AuthService): TrainerService {
  return new TrainerService(new Firebase(`${FIREBASE_TRAINERS_URL}`));
}
export function trainerStoreFactory(auth: AuthService): TrainerStore {
  return new TrainerStore(new Firebase(`${FIREBASE_TRAINERS_URL}`));
}

export const TRAINER_PROVIDERS: any[] = [
  {
    provide: TrainerService,
    deps: [
      AuthService
    ],
    useFactory: trainerServiceFactory
  }, {
    provide: TrainerStore,
    deps: [
      AuthService
    ],
    useFactory: trainerStoreFactory
  }
];
