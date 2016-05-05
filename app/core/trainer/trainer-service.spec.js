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

import { TrainerService } from './trainer-service';


describe('TrainerService', () => {
  let firebaseRef;
  let trainerService;

  beforeEach(() => {
    firebaseRef = new Firebase('trainers');
    trainerService = new TrainerService(firebaseRef);
  });

  describe('Creating a trainer', () => {
    it('should push new trainer to firebase', (done: any) => {
      firebaseRef.on('child_added', (snapshot: FirebaseDataSnapshot) => {
        expect(snapshot.val().title).toEqual('test');
        done();
      });

      trainerService.createTrainer('test');
      firebaseRef.flush();
    });
  });
});
