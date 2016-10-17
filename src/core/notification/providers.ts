import { FIREBASE_NOTIFICATIONS_URL } from '../../config';
import { AuthService } from '../auth/auth-service';

import { NotificationService } from './notification-service';
import { NotificationStore } from './notification-store';

export function notificationServiceFactory(auth: AuthService): NotificationService {
  return new NotificationService(new Firebase(`${FIREBASE_NOTIFICATIONS_URL}`));
}
export function notificationStoreFactory(auth: AuthService): NotificationStore {
  return new NotificationStore(new Firebase(`${FIREBASE_NOTIFICATIONS_URL}`), auth);
}

export const NOTIFICATION_PROVIDERS: any[] = [
  {
    provide: NotificationService,
    deps: [
      AuthService
    ],
    useFactory: notificationServiceFactory
  }, {
    provide: NotificationStore,
    deps: [
      AuthService
    ],
    useFactory: notificationStoreFactory
  }
];
