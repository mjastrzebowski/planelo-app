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

import { User } from './user';


describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User('test');
  });

  it('should set title with provided `title` param', () => {
    expect(user.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(user.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(user.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
