import { FIREBASE_BILLS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { BillService } from './bill-service';
import { BillStore } from './bill-store';

export function billServiceFactory(auth: AuthService): BillService {
  return new BillService(new Firebase(`${FIREBASE_BILLS_URL}`));
}
export function billStoreFactory(auth: AuthService): BillStore {
  return new BillStore(new Firebase(`${FIREBASE_BILLS_URL}`), auth);
}

export const BILL_PROVIDERS: any[] = [
  {
    provide: BillService,
    deps: [
      AuthService
    ],
    useFactory: billServiceFactory
  }, {
    provide: BillStore,
    deps: [
      AuthService
    ],
    useFactory: billStoreFactory
  }
];
