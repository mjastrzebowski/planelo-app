import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api-service';
import { BaseService } from 'app/services/_base/base-service';

@Injectable()
export class ActivityService extends BaseService {
  action = 'activities';

  constructor(public api: Api) {
    super(api);
  }
}
