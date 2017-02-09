import { Injectable } from '@angular/core';

import { Api } from 'app/core/api/api-service';

@Injectable()
export class WorkoutService {

  constructor(private api: Api) { }

  get(query?: any): Promise<any> {
    return this.api.get('workouts', query);
  }

  post(body: any): Promise<any> {
    return this.api.post('workouts', body);
  }

  put(body: any): Promise<any> {
    return this.api.put('workouts', body);
  }
}
