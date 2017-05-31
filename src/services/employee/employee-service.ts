import { Injectable } from '@angular/core';

import { Api } from 'app/services/api';
import { BaseService } from 'app/services/_base';

@Injectable()
export class EmployeeService extends BaseService {
  action = 'employees';

  constructor(public api: Api) {
    super(api);
  }
}
