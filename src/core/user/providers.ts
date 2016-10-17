import { FIREBASE_USERS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { UserService } from './user-service';
import { UserStore } from './user-store';

export function userServiceFactory(auth: AuthService): UserService {
  return new UserService(new Firebase(`${FIREBASE_USERS_URL}`));
}
export function userStoreFactory(auth: AuthService): UserStore {
  return new UserStore(new Firebase(`${FIREBASE_USERS_URL}`));
}


export const USER_PROVIDERS: any[] = [
  {
    provide: UserService,
    deps: [
      AuthService
    ],
    useFactory: userServiceFactory
  }, {
    provide: UserStore,
    deps: [
      AuthService
    ],
    useFactory: userStoreFactory
  }
];
