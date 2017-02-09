// import { Injectable, EventEmitter } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

// import { List } from 'immutable';
// import { ReplaySubject } from 'rxjs/ReplaySubject';

// import { ITrainer, Trainer } from './trainer';
// import { AuthService } from 'app/core/auth/auth-service';

// import { FIREBASE_TRAINERS_URL } from 'app/config';

// @Injectable()
// export class TrainerStore {
//   private loaded: boolean = false;
//   private emitter: EventEmitter<any> = new EventEmitter();
//   private trainers: FirebaseListObservable<ITrainer[]>;
//   public list: List<any> = List();

//   constructor(
//     private auth: AuthService,
//     private af: AngularFire
//   ) {
//     this.trainers = this.af.database.list('cal_trainers');
//     this.trainers.subscribe(list => {
//       this.list = List(list);
//       this.list.forEach(item => {
//         item.key = item.$key;
//         let place = (item.place === '-KBHukjV0l8M-EkpTdI4' ? 1 : 2);
//         this.auth.post({
//           "isClient": false,
//           "isTrainer": true,
//           "isAdmin": false,
//           "emailVerified": true,
//           "password": "egobody123",
//           "name": item.title.substring(0, item.title.indexOf(' ')) || item.title.substring(item.title.indexOf(' ') + 1),
//           "lastname": item.title.substring(0, item.title.indexOf(' ')) ? item.title.substring(item.title.indexOf(' ') + 1) : '',
//           "username": item.username,
//           "email": item.email,
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

//   createTrainer(title: string, email: string, hours: any) {
//     return this.trainers.push(new Trainer(title, email, hours));
//   }

//   removeTrainer(trainer: ITrainer) {
//     return this.trainers.remove(trainer.key);
//   }

//   updateTrainer(trainer: ITrainer, changes: any) {
//     return this.trainers.update(trainer.key, changes);
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

//   public getItem(key: string): ITrainer {
//     let index = this.findIndex(key);
//     return this.list.get(index);
//   }

//   public getItemByUsername(username: string): ITrainer {
//     let index = this.findIndexByUsername(username);
//     if (index === -1) {
//       return null;
//     }
//     return this.list.get(index);
//   }

//   public filterBy(filters: any): any {
//     return this.list.filter(trainer => {
//       let check = true;
//       Object.keys(filters).forEach(function (key) {
//         switch (key) {
//           case 'availableFrom': {
//             if (trainer.fullDate >= filters[key]) {
//               check = false;
//             }
//             break;
//           }
//           case 'availableTo': {
//             if (trainer.fullDate < filters[key]) {
//               check = false;
//             }
//             break;
//           }
//           default: {
//             if (trainer[key] !== filters[key]) {
//               check = false;
//             }
//             break;
//           }
//         }

//         if (!check) {
//           return false;
//         }
//       });
//       return check;
//     });
//   }

//   private findIndex(key: string): number {
//     return this.list.findIndex((trainer: ITrainer) => {
//       return trainer.key === key;
//     });
//   }

//   private findIndexByUsername(username: string): number {
//     return this.list.findIndex((trainer: ITrainer) => {
//       return trainer.username === username;
//     });
//   }
// }
