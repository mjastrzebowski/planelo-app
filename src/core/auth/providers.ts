import { FIREBASE_URL } from '../../config';
import { AuthRouteHelper } from './auth-route-helper';
import { AuthService } from './auth-service';

export function authServiceFactory(): AuthService {
  return new AuthService(new Firebase(FIREBASE_URL));
}

export const AUTH_PROVIDERS: any[] = [
  AuthRouteHelper,
  {
    provide: AuthService,
    useFactory: authServiceFactory
  }
];
