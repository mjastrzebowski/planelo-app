import { provide } from '@angular/core';
import { FIREBASE_PLACES_URL } from '../../config';
import { AuthService } from '../auth/auth-service';
import { PlaceService } from './place-service';
import { PlaceStore } from './place-store';


export const PLACE_PROVIDERS: any[] = [
  {
    provide: PlaceService,
    deps: [AuthService],
    useFactory: (auth: AuthService): PlaceService => {
      return new PlaceService(new Firebase(`${FIREBASE_PLACES_URL}`));
    }
  }, {
    provide: PlaceStore,
    deps: [AuthService],
    useFactory: (auth: AuthService): PlaceStore => {
      return new PlaceStore(new Firebase(`${FIREBASE_PLACES_URL}`));
    }
  }
];
