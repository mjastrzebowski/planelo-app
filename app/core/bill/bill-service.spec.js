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
} from '@angular/testing';
/* tslint:enable:no-unused-variable */

import { WorkoutService } from './workout-service';


describe('WorkoutService', () => {
  let firebaseRef;
  let workoutService;

  beforeEach(() => {
    firebaseRef = new Firebase('workouts/github:123');
    workoutService = new WorkoutService(firebaseRef);
  });

  describe('Creating a workout', () => {
    it('should push new workout to firebase', (done: any) => {
      firebaseRef.on('child_added', (snapshot: FirebaseDataSnapshot) => {
        expect(snapshot.val().title).toEqual('test');
        done();
      });

      workoutService.createWorkout('test');
      firebaseRef.flush();
    });
  });
});
