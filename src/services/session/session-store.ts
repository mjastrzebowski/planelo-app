import { Injectable } from '@angular/core';
import { List } from 'immutable';

import { BaseStore, BaseStream } from 'app/services/_base';

import { ISession, Session } from './session';
import { SessionService } from './session-service';

@Injectable()
export class SessionStore extends BaseStore {
  constructor(
    private sessionService: SessionService,
    private baseStream: BaseStream
  ) {
    super(sessionService, baseStream);
    this.model = 'Session';
    this.init();
  }

  getByClient(clientId: number): List<ISession> {
    return this.filterBy({
      clientId: clientId
    });
  }

  findClientSessionIndex(clientKey: string, date: string, timeStart: string): number {
    return this.list.findIndex((session: ISession) => {
      return session.clientKey === clientKey && session.date === date && session.timeStart === timeStart;
    });
  }
}
