import { Injectable } from '@angular/core';

import { Api } from 'app/core/api/api-service';

@Injectable()
export class PlaceService {
  private action: string = 'places';
  changeStream: any;

  constructor(private api: Api) {
    this.changeStream = Api.changeStream(this.action);
  }

  get(query?: any): Promise<any> {
    return this.api.get(this.action, query);
  }

  put(body: any): Promise<any> {
    return this.api.put(this.action, body);
  }
}
