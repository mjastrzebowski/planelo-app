import { Injectable } from '@angular/core';

import { Api } from 'app/services/api/api-service';

@Injectable()
export class BaseService {
  public action: string;

  constructor(public api: Api) {}

  changeStream() {
    return Api.changeStream(this.action);
  }

  get(query?: any): Promise<any> {
    return this.api.get(this.action, query);
  }
  create(body: any): Promise<any> {
    return this.api.post(this.action, body);
  }
  update(itemId: number, body: any): Promise<any> {
    return this.api.patch(this.action + '/' + itemId, body);
  }
  delete(itemId: number): Promise<any> {
    return this.api.delete(this.action + '/' + itemId);
  }
}
