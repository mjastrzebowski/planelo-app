import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { List } from 'immutable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { IPlace, Place } from './place';
import { PlaceService } from './place-service';

import { FIREBASE_PLACES_URL } from '../../config';

@Injectable()
export class PlaceStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private places: FirebaseListObservable<IPlace[]>;
  public list: List<any> = List();

  constructor(
    private placeService: PlaceService,
    private af: AngularFire
  ) {
    this.places = this.af.database.list('cal_places');
    // this.places = this.placeService.get();
    this.places.subscribe(list => {
      // this.list = List(list.json());
      this.list = List(list);
      this.list.forEach(item => {
        item.key = item.$key;
      });

      this.loaded = true;
      this.emit();
    });
  }

  createPlace(title: string) {
    return this.places.push(new Place(title));
  }

  removePlace(place: IPlace) {
    return this.places.remove(place.key);
  }

  updatePlace(place: IPlace, changes: any) {
    return this.places.update(place.key, changes);
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

  public getItem(key: string): IPlace {
    let index = this.findIndex(key);
    return this.list.get(index);
  }

  private findIndex(key: string): number {
    return this.list.findIndex((place: IPlace) => {
      return place.key === key;
    });
  }
}
