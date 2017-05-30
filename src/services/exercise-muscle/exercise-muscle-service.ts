import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api-service';
import { BaseService } from 'app/services/_base/base-service';

@Injectable()
export class ExerciseMuscleService extends BaseService {
  action = 'exercise-muscles';

  constructor(public api: Api) {
    super(api);
  }
}
