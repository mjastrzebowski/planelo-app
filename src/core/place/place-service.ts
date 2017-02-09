import { Injectable } from '@angular/core';

import { Api } from 'app/core/api/api-service';

@Injectable()
export class PlaceService {

  constructor(private api: Api) { }

  get(query?: any): Promise<any> {
    return this.api.get('places', query);
  }

  put(body: any): Promise<any> {
    return this.api.put('places', body);
  }
}
