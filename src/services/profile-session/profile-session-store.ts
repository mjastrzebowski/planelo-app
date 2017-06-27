import { Injectable } from '@angular/core';

import { BaseStore, BaseStream } from 'app/services/_base';

import { IProfileSession, ProfileSession } from './profile-session';
import { ProfileSessionService } from './profile-session-service';

@Injectable()
export class ProfileSessionStore extends BaseStore {
  constructor(
    private profileSessionService: ProfileSessionService,
    private baseStream: BaseStream
  ) {
    super(profileSessionService, baseStream);
    this.model = 'ProfileSession';
    this.init();
  }
}
