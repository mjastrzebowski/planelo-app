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

import { Place } from './place';


describe('Place', () => {
  let place: Place;

  beforeEach(() => {
    place = new Place('test');
  });

  it('should set title with provided `title` param', () => {
    expect(place.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(place.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(place.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
