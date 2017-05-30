import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api-service';
import { BaseService } from 'app/services/_base/base-service';

@Injectable()
export class RoutineService extends BaseService {
  action = 'routines';

  constructor(public api: Api) {
    super(api);
  }
}
