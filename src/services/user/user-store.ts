import { Injectable, EventEmitter } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IUser, User } from './user';

import { FIREBASE_USERS_URL } from 'app/config';

@Injectable()
export class UserStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public users: any; // FirebaseListObservable<IUser[]>;
  public list: List<any> = List();

  constructor(
    // private af: AngularFire
  ) {
    // this.users = this.af.database.list('users', {
    //   query: {
    //     orderByChild: 'lastname'
    //   }
    // });
    // this.users.subscribe(list => {
    //   this.list = List(list);
    //   this.list.forEach(item => {
    //     item.id = item.$key;
    //   });

    //   this.loaded = true;
    //   this.emit();
    // });
  }

  createUser(id: string, key: string, type: string) {
    // debugger;
    // return this.users.$ref.child(id).set(new User(key, type));
  }

  removeUser(user: IUser) {
    return this.users.remove(user.id);
  }

  updateUser(user: IUser, changes: any) {
    return this.users.update(user.id, changes);
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

  public getItem(id: string): IUser {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  public getItemByKey(key: string): IUser {
    let index = this.findIndexByKey(key);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  private findIndex(id: string): number {
    return this.list.findIndex((user: IUser) => {
      return user.id === id;
    });
  }

  private findIndexByKey(key: string): number {
    return this.list.findIndex((user: IUser) => {
      return user.key === key;
    });
  }
}
