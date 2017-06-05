import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { BaseService } from 'app/services/_base';

@Injectable()
export class EmployeeVacationService extends BaseService {
  action = 'employee-vacations';

  constructor(public api: Api) {
    super(api);
  }
}
