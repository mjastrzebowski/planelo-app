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
  create(body: any): Promise<any> {
    return this.api.post(this.action, body);
  }
  update(placeId: number, body: any): Promise<any> {
    return this.api.patch(this.action + '/' + placeId, body);
  }
  delete(placeId: number): Promise<any> {
    return this.api.delete(this.action + '/' + placeId);
  }
}
