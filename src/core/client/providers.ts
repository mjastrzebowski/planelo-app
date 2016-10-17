import { FIREBASE_CLIENTS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { ClientService } from './client-service';
import { ClientStore } from './client-store';

export function clientServiceFactory(auth: AuthService): ClientService {
  return new ClientService(new Firebase(`${FIREBASE_CLIENTS_URL}`));
}
export function clientStoreFactory(auth: AuthService): ClientStore {
  return new ClientStore(new Firebase(`${FIREBASE_CLIENTS_URL}`));
}

export const CLIENT_PROVIDERS: any[] = [
  {
    provide: ClientService,
    deps: [
      AuthService
    ],
    useFactory: clientServiceFactory
  }, {
    provide: ClientStore,
    deps: [
      AuthService
    ],
    useFactory: clientStoreFactory
  }
];
