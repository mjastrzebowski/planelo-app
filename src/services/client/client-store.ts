import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { IClient, Client } from './client';
import { AuthService } from 'app/services/auth/auth-service';

@Injectable()
export class ClientStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public list: List<any> = List();

  constructor(
    private auth: AuthService
  ) {
    this.auth.get({ filter: { where: { isClient: true }}}).then(data => {
      this.list = List(data);
      this.loaded = true;
      this.emit();
    });
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

  get(): List<IClient[]> {
    return this.list;
  }

  public getItem(id: number): IClient {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  public getItemByKey(key: string): IClient {
    let index = this.findIndexByKey(key);
    return this.list.get(index);
  }

  public getItemByUsername(username: string): IClient {
    let index = this.findIndexByUsername(username);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  private findIndex(id: number): number {
    return this.list.findIndex((client: IClient) => {
      return client.id === id;
    });
  }

  private findIndexByKey(key: string): number {
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
