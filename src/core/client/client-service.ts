import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { IClient, Client } from './client';

@Injectable()
export class ClientService {
  constructor(private af: AngularFire) {}

  createClient(name: string, lastname: string, email: string, phone: string, comment: string): void {
    return this.ref.push(new Client(name, lastname, email, phone, comment), (error: Error) => {
      if (error) {
        console.error('ERROR @ createClient :', error);
      }
    });
  }

  deleteClient(client: IClient): void {
    return this.ref.child(client.key).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteClient :', error);
      }
    });
  }

  updateClient(client: IClient, changes: any): void {
    return this.ref.child(client.key).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateClient :', error);
      }
    });
  }
}
