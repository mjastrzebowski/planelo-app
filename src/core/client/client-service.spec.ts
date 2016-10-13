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

import { ClientService } from './client-service';


describe('ClientService', () => {
  let firebaseRef;
  let clientService;

  beforeEach(() => {
    firebaseRef = new Firebase('clients/github:123');
    clientService = new ClientService(firebaseRef);
  });

  describe('Creating a client', () => {
    it('should push new client to firebase', (done: any) => {
      firebaseRef.on('child_added', (snapshot: FirebaseDataSnapshot) => {
        expect(snapshot.val().title).toEqual('test');
        done();
      });

      clientService.createClient('test');
      firebaseRef.flush();
    });
  });
});
