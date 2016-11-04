import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';

import { IUser, User } from './user';

@Injectable()
export class UserService {
  constructor(private af: AngularFire) {}

  createUser(id: string, key: string, type: string): void {
    this.ref.child(id).set(new User(id, key, type), (error: Error) => {
      if (error) {
        console.error('ERROR @ createUser :', error);
      }
    });
  }

  deleteUser(user: IUser): void {
    this.ref.child(user.id).remove((error: Error) => {
      if (error) {
        console.error('ERROR @ deleteUser :', error);
      }
    });
  }

  updateUser(user: IUser, changes: any): void {
    this.ref.child(user.id).update(changes, (error: Error) => {
      if (error) {
        console.error('ERROR @ updateUser :', error);
      }
    });
  }
}
