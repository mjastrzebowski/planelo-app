import { provide } from '@angular/core';
import { FIREBASE_NOTIFICATIONS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { NotificationService } from './notification-service';
import { NotificationStore } from './notification-store';

export const NOTIFICATION_PROVIDERS: any[] = [
  {
    provide: NotificationService,
    deps: [AuthService],
    useFactory: (auth: AuthService): NotificationService => {
      return new NotificationService(new Firebase(`${FIREBASE_NOTIFICATIONS_URL}`));
    }
  }, {
    provide: NotificationStore,
    deps: [AuthService],
    useFactory: (auth: AuthService): NotificationStore => {
      return new NotificationStore(new Firebase(`${FIREBASE_NOTIFICATIONS_URL}`), auth);
    }
  }
];
