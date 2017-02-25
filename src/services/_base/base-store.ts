import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseService } from './base-service';

@Injectable()
export class BaseStore {
  public filter: any;
  public list: List<any> = List();
  protected loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private changeStream: any;

  constructor(private service: BaseService) {}

  init() {
    this.service.get(this.filter).then(data => {
      this.list = List(data);
      this.list.forEach(item => {
        item = this.convertItem(item);
      });
      this.loaded = true;
      this.emit();

      this.changeStream = this.service.changeStream();
      this.changeStream.addEventListener('data', this.changeParser.bind(this))
      // this.changeStream.addEventListener('error', (error) => {
      //   console.info('[ error ][ Store "' + this.service.action + '" - changeStream ]: ', error);
      // });
    }, error => {
      console.error('[ error ][ Store "' + this.service.action + '" - GET ]: ', error);
    });
  }

  changeParser(msg: any) {
    let data = JSON.parse(msg.data);
    switch (data.type) {
      case 'create':
        this.list = this.list.push(this.convertItem(data.data));
        break;
      case 'update':
        this.list = this.list.update(this.findIndex(data.target), () => { return this.convertItem(data.data); });
        break;
      case 'remove':
        this.list = this.list.remove(this.findIndex(data.target));
        break;
    }
    this.emit();
  }

  get(): List<any[]> {
    return this.list;
  }
  create(item: any) {
    return this.service.create(item);
  }
  update(itemId: number, item: any) {
    return this.service.update(itemId, item);
  }
  delete(itemId: number) {
    return this.service.delete(itemId);
  }

  convertItem(item: any) {
    return item;
  }
  refresh(args?: any) {
    this.list.forEach(item => {
      item = this.convertItem(item);
    });
  }

  getItem(id: number): any {
    let index = this.findIndex(id);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }
  getItemByKey(key: string): any {
    let index = this.findIndexByKey(key);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }
  getItemByProfile(profileId: number): any {
    let index = this.findIndexByProfile(profileId);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }
  getItemByUsername(username: string): any {
    let index = this.findIndexByUsername(username);
    if (index === -1) {
      return null;
    }
    return this.list.get(index);
  }

  filterBy(filters: any): any {
    return this.list.filter(item => {
      let check = true;
      Object.keys(filters).forEach(function (key) {
        switch (key) {
          case 'availableFrom': {
            if (item.fullDate >= filters[key]) {
              check = false;
            }
            break;
          }
          case 'availableTo': {
            if (item.fullDate < filters[key]) {
              check = false;
            }
            break;
          }
          default: {
            if (item[key] !== filters[key]) {
              check = false;
            }
            break;
          }
        }

        if (!check) {
          return false;
        }
      });
      return check;
    });
  }

  subscribe(next: (loaded: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    this.emit();
    return subscription;
  }

  get size(): number {
    return this.list.size;
  }

  protected emit(): void {
    this.emitter.next(this.loaded);
  }

  private findIndex(id: number): number {
    return this.list.findIndex((item: any) => {
      return item.id === id;
    });
  }
  private findIndexByKey(key: string): number {
    return this.list.findIndex((item: any) => {
      return item.key === key;
    });
  }
  private findIndexByProfile(profileId: number): number {
    return this.list.findIndex((item: any) => {
      return item.profileId === profileId;
    });
  }
  private findIndexByUsername(username: string): number {
    return this.list.findIndex((item: any) => {
      return item.username === username;
    });
  }
}
