import { FIREBASE_PLACES_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { PlaceService } from './place-service';
import { PlaceStore } from './place-store';

export function placeServiceFactory(auth: AuthService): PlaceService {
  return new PlaceService(new Firebase(`${FIREBASE_PLACES_URL}`));
}
export function placeStoreFactory(auth: AuthService): PlaceStore {
  return new PlaceStore(new Firebase(`${FIREBASE_PLACES_URL}`));
}

export const PLACE_PROVIDERS: any[] = [
  {
    provide: PlaceService,
    deps: [
      AuthService
    ],
    useFactory: placeServiceFactory
  }, {
    provide: PlaceStore,
    deps: [
      AuthService
    ],
    useFactory: placeStoreFactory
  }
];
