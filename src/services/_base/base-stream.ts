import { Injectable, EventEmitter } from '@angular/core';

import { Api } from 'app/services/api/api-service';

@Injectable()
export class BaseStream {
  private emitter: EventEmitter<any> = new EventEmitter();
  public action: string = 'updates';
  public stream: any;

  constructor(public api: Api) {
    this.stream = Api.changeStream(this.action);
    this.stream.addEventListener('message', this.emit.bind(this));
    // this.stream.addEventListener('error', (error) => {
    //   console.info('[ error ][ Store "' + this.service.action + '" - changeStream ]: ', error);
    // });
  }

  subscribe(next: (changes: any) => void): any {
    let subscription = this.emitter.subscribe(next);
    return subscription;
  }
  private emit(changes): void {
    this.emitter.next(changes.data);
  }
}
