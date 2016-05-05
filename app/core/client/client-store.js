import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/subject/ReplaySubject';
import { IClient } from './client';


export class ClientStore {
  clients: ReplaySubject<List<any>> = new ReplaySubject(1);
  private list: List<any> = List();

  constructor(ref: Firebase) {
    ref = ref.orderByChild('lastname');
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
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

  private emit(): void {
    this.clients.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let client: IClient = snapshot.val();
      client.key = key;
      this.list = this.list.push(client);
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
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index !== -1) {
      let client: IClient = snapshot.val();
      client.key = key;
      this.list = this.list.set(index, client);
      this.emit();
    }
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
