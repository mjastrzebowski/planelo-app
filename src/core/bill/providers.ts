import { provide } from '@angular/core';
import { FIREBASE_BILLS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { BillService } from './bill-service';
import { BillStore } from './bill-store';

export const BILL_PROVIDERS: any[] = [
  {
    provide: BillService,
    deps: [AuthService],
    useFactory: (auth: AuthService): BillService => {
      return new BillService(new Firebase(`${FIREBASE_BILLS_URL}`));
    }
  }, {
    provide: BillStore,
    deps: [AuthService],
    useFactory: (auth: AuthService): BillStore => {
      return new BillStore(new Firebase(`${FIREBASE_BILLS_URL}`), auth);
    }
  }
];
