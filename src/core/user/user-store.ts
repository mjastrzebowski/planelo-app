import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IUser } from './user';


export class UserStore {
  users: ReplaySubject<List<any>> = new ReplaySubject(1);
  private list: List<any> = List();

  constructor(ref: Firebase) {
    // ref = ref.orderByChild('lastname');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(id: string): IUser {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  private emit(): void {
    this.users.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let id: string = snapshot.key();
    let index: number = this.findIndex(id);
    if (index === -1) {
      let user: IUser = snapshot.val();
      user.id = id;
      this.list = this.list.push(user);
      this.emit();
    }
  }

  private deleted(snapshot: FirebaseDataSnapshot): void {
    let index: number = this.findIndex(snapshot.key());
    if (index !== -1) {
      this.list = this.list.delete(index);
      this.emit();
    }
  }

  private updated(snapshot: FirebaseDataSnapshot): void {
    let id: string = snapshot.key();
    let index: number = this.findIndex(id);
    if (index !== -1) {
      let user: IUser = snapshot.val();
      user.id = id;
      this.list = this.list.set(index, user);
      this.emit();
    }
  }

  private findIndex(id: string): number {
    return this.list.findIndex((user: IUser) => {
      return user.id === id;
    });
  }
}
