import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IClient, Client } from './client';
import { AuthService } from 'app/services/auth/auth-service';

@Injectable()
export class ClientStore extends BaseStore {
  filter = { filter: { where: { isClient: true }, order: ['lastname', 'name'] }};

  constructor(
    private auth: AuthService,
    private baseStream: BaseStream
  ) {
    super(auth, baseStream);
    this.model = 'Profile';
    this.init();
  }

  createClient(name: string, lastname: string, email: string, phone: string, comment: string) {
    return new Promise((resolve, reject) => {});
    // return this.clients.push(new Client(name, lastname, email, phone, comment));
  }
  removeClient(client: IClient) {
    return new Promise((resolve, reject) => {});
    // return this.clients.remove(client.key);
  }
  updateClient(client: IClient, changes: any) {
    return new Promise((resolve, reject) => {});
    // return this.clients.update(client.key, changes);
  }

}
