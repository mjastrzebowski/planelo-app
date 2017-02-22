import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { IHour, Hour } from './hour';
import { HourService } from './hour-service';

@Injectable()
export class HourStore {
  private loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private changeStream: any;
  public list: List<any> = List();

  constructor(
    private hourService: HourService
  ) {
    this.hourService.get().then(data => {
      this.list = List(data);
      this.loaded = true;
      this.emit();

      hourService.changeStream.addEventListener('data', this.changeParser.bind(this));
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

  create(hour: IHour) {
    return this.hourService.create(hour);
  }
  update(hourId: number, hour: any) {
    return this.hourService.update(hourId, hour);
  }
  delete(hourId: number) {
    return this.hourService.delete(hourId);
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

  public getItem(id: number): IHour {
    let index = this.findIndex(id);
    return this.list.get(index);
  }

  public getItemByProfile(profileId: number): IHour {
    let index = this.findIndexByProfile(profileId);
    return this.list.get(index);
  }

  private findIndex(id: number): number {
    return this.list.findIndex((hour: IHour) => {
      return hour.id === id;
    });
  }

  private findIndexByProfile(profileId: number): number {
    return this.list.findIndex((hour: IHour) => {
      return hour.profileId === profileId;
    });
  }

  filterBy(filters: any): any {
    return this.list.filter(hour => {
      let check = true;
      Object.keys(filters).forEach(function (key) {
        if (hour[key] !== filters[key]) {
          check = false;
        }
        if (!check) {
          return false;
        }
      });
      return check;
    });
  }
}
