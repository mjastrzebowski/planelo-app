import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IPlace } from './place';


export class PlaceStore {
  places: ReplaySubject<List<any>> = new ReplaySubject(1);
  public list: List<any> = List();

  constructor(ref: Firebase) {
    ref.on('child_added', this.created.bind(this));
    ref.on('child_changed', this.updated.bind(this));
    ref.on('child_removed', this.deleted.bind(this));
    ref.once('value', () => this.emit());
  }

  get size(): number {
    return this.list.size;
  }

  public getItem(key: string): IPlace {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  private emit(): void {
    this.places.next(this.list);
  }

  private created(snapshot: FirebaseDataSnapshot): void {
    let key: string = snapshot.key();
    let index: number = this.findIndex(key);
    if (index === -1) {
      let place: IPlace = snapshot.val();
      place.key = key;
      this.list = this.list.push(place);
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
      let place: IPlace = snapshot.val();
      place.key = key;
      this.list = this.list.set(index, place);
      this.emit();
    }
  }

  private findIndex(key: string): number {
    return this.list.findIndex((place: IPlace) => {
      return place.key === key;
    });
  }
}
