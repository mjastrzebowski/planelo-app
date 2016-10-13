import { provide } from '@angular/core';
import { FIREBASE_USERS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { UserService } from './user-service';
import { UserStore } from './user-store';


export const USER_PROVIDERS: any[] = [
  {
    provide: UserService,
    deps: [AuthService],
    useFactory: (auth: AuthService): UserService => {
      return new UserService(new Firebase(`${FIREBASE_USERS_URL}`));
    }
  }, {
    provide: UserStore,
    deps: [AuthService],
    useFactory: (auth: AuthService): UserStore => {
      return new UserStore(new Firebase(`${FIREBASE_USERS_URL}`));
    }
  }
];
