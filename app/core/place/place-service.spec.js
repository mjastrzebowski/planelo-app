/* tslint:disable:no-unused-variable */
import {
  afterEach,
  beforeEach,
  describe,
  fdescribe,
  xdescribe,
  expect,
  it,
  fit,
  xit
} from 'angular2/testing';
/* tslint:enable:no-unused-variable */

import { PlaceService } from './place-service';


describe('PlaceService', () => {
  let firebaseRef;
  let placeService;

  beforeEach(() => {
    firebaseRef = new Firebase('places/github:123');
    placeService = new PlaceService(firebaseRef);
  });

  describe('Creating a place', () => {
    it('should push new place to firebase', (done: any) => {
      firebaseRef.on('child_added', (snapshot: FirebaseDataSnapshot) => {
        expect(snapshot.val().title).toEqual('test');
        done();
      });

      placeService.createPlace('test');
      firebaseRef.flush();
    });
  });
});
