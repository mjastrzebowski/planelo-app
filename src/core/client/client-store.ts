import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IClient, Client } from './client';

import { FIREBASE_CLIENTS_URL } from '../../config';

@Injectable()
export class ClientStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private clients: FirebaseListObservable<IClient[]>;
  public list: List<any> = List();

  constructor(
    private af: AngularFire
  ) {
    this.clients = this.af.database.list('cal_clients', {
      query: {
        orderByChild: 'lastname'
      }
    });
    this.clients.subscribe(list => {
      this.list = List(list);
      this.list.forEach(item => {
        item.key = item.$key;
      });

      this.loaded = true;
      this.emit();
    });
  }

  createClient(name: string, lastname: string, email: string, phone: string, comment: string) {
    return this.clients.push(new Client(name, lastname, email, phone, comment));
  }

  removeClient(client: IClient) {
    return this.clients.remove(client.key);
  }

  updateClient(client: IClient, changes: any) {
    return this.clients.update(client.key, changes);
  }

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  private emit(): void {
    this.emitter.next(this.loaded);
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): IClient {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  public getItemByUsername(username: string): IClient {
    let index = this.findIndexByUsername(username);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  private findIndex(key: string): number {
    return this.list.findIndex((client: IClient) => {
      return client.key === key;
    });
  }

  private findIndexByUsername(username: string): number {
    return this.list.findIndex((client: IClient) => {
      return client.username === username;
    });
  }
}
