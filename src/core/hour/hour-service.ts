import { Injectable } from '@angular/core';

import { Api } from 'app/core/api/api-service';

@Injectable()
export class HourService {
  private action: string = 'working-hours';
  changeStream: any;

  constructor(private api: Api) {
    this.changeStream = Api.changeStream(this.action);
  }

  get(query?: any): Promise<any> {
    return this.api.get(this.action, query);
  }
  create(body: any): Promise<any> {
    return this.api.post(this.action, body);
  }
  update(hourId: number, body: any): Promise<any> {
    return this.api.patch(this.action + '/' + hourId, body);
  }
  delete(hourId: number): Promise<any> {
    return this.api.delete(this.action + '/' + hourId);
  }
}
