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

import { Trainer } from './trainer';


describe('Trainer', () => {
  let trainer: Trainer;

  beforeEach(() => {
    trainer = new Trainer('test');
  });

  it('should set title with provided `title` param', () => {
    expect(trainer.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(trainer.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(trainer.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
