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

import { Client } from './client';


describe('Client', () => {
  let client: Client;

  beforeEach(() => {
    client = new Client('test');
  });

  it('should set title with provided `title` param', () => {
    expect(client.title).toBe('test');
  });

  it('should set `completed` to `false`', () => {
    expect(client.completed).toBe(false);
  });

  it('should set `createdAt` to firebase timestamp placeholder', () => {
    expect(client.createdAt).toEqual(Firebase.ServerValue.TIMESTAMP);
  });
});
