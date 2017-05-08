// import { Injectable, EventEmitter } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import { List } from 'immutable';
// import { ReplaySubject } from 'rxjs/ReplaySubject';

// import { IClient, Client } from './client';
// import { AuthService } from 'app/services/auth/auth-service';

// import { FIREBASE_CLIENTS_URL } from 'app/config';

// @Injectable()
// export class ClientStore {
//   private loaded: boolean = false;
//   private emitter: EventEmitter<any> = new EventEmitter();
//   private clients: FirebaseListObservable<IClient[]>;
//   public list: List<any> = List();

//   constructor(
//     private af: AngularFire,
//     private auth: AuthService
//   ) {
//     this.clients = this.af.database.list('cal_clients', {
//       query: {
//         orderByChild: 'lastname'
//       }
//     });
//     this.clients.subscribe(list => {
//       this.list = List(list);
//       let i = 1;
//       this.list.forEach(item => {
//         item.key = item.$key;

//         let place = (item.place === '-KBHukjV0l8M-EkpTdI4' ? 1 : 2);
//         this.auth.post({
//           "isClient": true,
//           "isTrainer": false,
//           "isAdmin": false,
//           "emailVerified": true,
//           "password": "egobody123",
//           "name": item.name,
//           "lastname": item.lastname,
//           "username": item.username,
//           "email": (item.email === 'fake@mail.com') ? 'fake'+(i++)+'@mail.com' : item.email,
//           "placeId": place,
//           "alias": item.alias,
//           "avatar": item.avatar,
//           "color": item.color,
//           "comment": item.comment,
//           "gender": item.gender,
//           "phone": item.phone,
//           "key": item.key
//         });
//       });

//       this.loaded = true;
//       this.emit();
//     });
//   }

//   createClient(name: string, lastname: string, email: string, phone: string, comment: string) {
//     return this.clients.push(new Client(name, lastname, email, phone, comment));
//   }

//   removeClient(client: IClient) {
//     return this.clients.remove(client.key);
//   }

//   updateClient(client: IClient, changes: any) {
//     return this.clients.update(client.key, changes);
//   }

//   subscribe(next: (loaded: any) => void): any {
//     let subscription = this.emitter.subscribe(next);
//     this.emit();
//     return subscription;
//   }

//   private emit(): void {
//     this.emitter.next(this.loaded);
//   }

//   get size(): number {
//     return this.list.size;
//   }

//   public getItem(key: string): IClient {
//     let index = this.findIndex(key);
//     return this.list.get(index);
//   }

//   public getItemByUsername(username: string): IClient {
//     let index = this.findIndexByUsername(username);
//     if (index === -1) {
//       return null;
//     }
//     return this.list.get(index);
//   }

//   private findIndex(key: string): number {
//     return this.list.findIndex((client: IClient) => {
//       return client.key === key;
//     });
//   }

//   private findIndexByUsername(username: string): number {
//     return this.list.findIndex((client: IClient) => {
//       return client.username === username;
//     });
//   }
// }
