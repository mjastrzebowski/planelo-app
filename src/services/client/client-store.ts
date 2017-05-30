import { Injectable, EventEmitter } from '@angular/core';

import { BaseStore } from 'app/services/_base/base-store';
import { BaseStream } from 'app/services/_base/base-stream';

import { IClient, Client } from './client';
import { ClientService } from './client-service';

import { AuthStore } from 'app/services/auth/auth-store';
// import { CompanyStore } from 'app/services/company/company-store';

@Injectable()
export class ClientStore extends BaseStore {
  constructor(
    private clientService: ClientService,
    private baseStream: BaseStream,
    private authStore: AuthStore
    // private companyStore: CompanyStore
  ) {
    super(clientService, baseStream);
    this.model = 'Client';
    this.init();

    this.authStore.subscribe(this.refresh.bind(this));
    // this.companyStore.subscribe(this.refresh.bind(this));
  }

  convertItem(item: any) {
    item = super.convertItem(item);
    item.profile = this.authStore.getItem(item.profileId) || {};
    item.name = item.profile.name + ' ' + item.profile.lastname;
    // item.company = this.companyStore.getItem(item.companyId);
    return item;
  }

  createClient(name: string, lastname: string, email: string, phone: string, comment: string) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.push(new Client(title, email, hours));
  }
  removeClient(trainer: IClient) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.remove(trainer.key);
  }
  updateClient(trainer: IClient, changes: any) {
    return new Promise((resolve, reject) => {});
    // return this.trainers.update(trainer.key, changes);
  }

}
