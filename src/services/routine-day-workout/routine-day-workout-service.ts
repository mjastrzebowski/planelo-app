import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api-service';
import { BaseService } from 'app/services/_base/base-service';

@Injectable()
export class RoutineDayWorkoutService extends BaseService {
  action = 'routine-day-workouts';

  constructor(public api: Api) {
    super(api);
  }
}
