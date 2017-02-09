import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { IPlace, Place } from './place';
import { PlaceService } from './place-service';

@Injectable()
export class PlaceStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  public list: List<any> = List();

  constructor(
    private placeService: PlaceService
  ) {
    this.placeService.get().then(data => {
      this.list = List(data);
      this.loaded = true;
      this.emit();
    }, (error) => {
      console.log(error);
    });
  }

  createPlace(title: string) {
    // return this.places.push(new Place(title));
  }

  removePlace(place: IPlace) {
    // return this.places.remove(place.key);
  }

  updatePlace(place: IPlace, changes: any) {
    // return this.places.update(place.key, changes);
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
