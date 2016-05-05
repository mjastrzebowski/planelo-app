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

import { Workout } from './workout';


describe('Workout', () => {
  let workout: Workout;

  beforeEach(() => {
    workout = new Workout('test');
  });

  it('should set title with provided `title` param', () => {
    expect(workout.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(workout.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(workout.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
