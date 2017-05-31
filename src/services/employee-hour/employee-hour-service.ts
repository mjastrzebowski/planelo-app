import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { BaseService } from 'app/services/_base';

@Injectable()
export class EmployeeHourService extends BaseService {
  action = 'employee-hours';

  constructor(public api: Api) {
    super(api);
  }
}
