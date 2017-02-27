import { Injectable, EventEmitter } from '@angular/core';

import { List } from 'immutable';

import { BaseService } from './base-service';
import { BaseStream } from './base-stream';

@Injectable()
export class BaseStore {
  public filter: any;
  public model: string;
  public list: List<any> = List();
  protected loaded: boolean = false;
  private emitter: EventEmitter<any> = new EventEmitter();
  private changeStream: any;

  constructor(
    private service: BaseService,
    private stream: BaseStream
  ) {}

  init() {
    this.service.get(this.filter).then(data => {
      this.list = List(data);
      this.list.forEach(item => {
        item = this.convertItem(item);
      });
      this.loaded = true;
      this.emit();
      this.watchStream();
    }, error => {
      console.error('[ error ][ Store "' + this.service.action + '" - GET ]: ', error);
    });
  }

  watchStream() {
    this.stream.subscribe(this.parseStream.bind(this));
  }
  parseStream(msg: any) {
    let data = JSON.parse(msg);
    if (data.modelName !== this.model) {
      return false;
    }
    switch (data.kind) {
      case 'create':
        this.createLocal(data.data);
        break;
      case 'update':
        this.updateLocal(data.target, data.data);
        break;
      case 'remove':
        this.deleteLocal(data.target);
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

  createLocal(item) {
    this.list = this.list.push(this.convertItem(item));
  }
  updateLocal(itemId, item) {
    this.list = this.list.update(this.findIndex(itemId), () => { return this.convertItem(item); });
  }
  deleteLocal(itemId) {
    this.list = this.list.remove(this.findIndex(itemId));
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
          case 'dateBefore': {
            if (item.fullDate >= filters[key]) {
              check = false;
            }
            break;
          }
          case 'dateAfter': {
            if (item.fullDate < filters[key]) {
              check = false;
            }
            break;
          }
          case 'fixed': {
            if ((filters[key] === true && item[key] !== filters[key])
              || (filters[key] === false && item[key] && item[key] !== filters[key])) {
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
