import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { IPlace, Place } from './place';
import { PlaceService } from './place-service';

@Injectable()
export class PlaceStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private changeStream: any;
  public list: List<any> = List();

  constructor(
    private placeService: PlaceService
  ) {
    this.placeService.get().then(data => {
      this.list = List(data);
      this.loaded = true;
      this.emit();

      placeService.changeStream.addEventListener('data', this.changeParser.bind(this));
    }, (error) => {
      console.log(error);
    });
  }

  changeParser(msg: any) {
    var data = JSON.parse(msg.data);
    // console.log(data, this.list); // the change object
    switch (data.type) {
      case 'create':
        this.list = this.list.push(data.data);
        break;
      case 'update':
        this.list = this.list.update(this.findIndex(data.target), () => { return data.data });
        break;
      case 'remove':
        this.list = this.list.remove(this.findIndex(data.target));
        break;
    }
  }

  create(place: IPlace) {
    return this.placeService.create(place);
  }
  update(placeId: number, place: any) {
    return this.placeService.update(placeId, place);
  }
  delete(placeId: number) {
    return this.placeService.delete(placeId);
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

  public getItem(id: number): IPlace {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  private findIndex(id: number): number {
    return this.list.findIndex((place: IPlace) => {
      return place.id === id;
    });
  }
}
