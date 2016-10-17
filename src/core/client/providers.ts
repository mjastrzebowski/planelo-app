import { FIREBASE_CLIENTS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { ClientService } from './client-service';
import { ClientStore } from './client-store';


export const CLIENT_PROVIDERS: any[] = [
  {
    provide: ClientService,
    deps: [
      AuthService
    ],
    useFactory: (auth: AuthService): ClientService => {
      return new ClientService(new Firebase(`${FIREBASE_CLIENTS_URL}`));
    }
  }, {
    provide: ClientStore,
    deps: [
      AuthService
    ],
    useFactory: (auth: AuthService): ClientStore => {
      return new ClientStore(new Firebase(`${FIREBASE_CLIENTS_URL}`));
    }
  }
];
