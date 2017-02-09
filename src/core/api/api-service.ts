import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Config } from 'app/config';
import { AuthService } from 'app/core/auth/auth-service';

@Injectable()
export class Api {
  static headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  static buildUrl(action: string, query: any = {}) {
    let token: string = AuthService.getToken();
    if (token) {
      query.access_token = token;
    }

    let url = Config.API_URL + action;
    if (query.hasOwnProperty('id')) {
      url += query.id ? '/' + query.id : '';
      delete query.id;
    }
    url += Object.keys(query).length > 0 ? '?' : '';
    url += Object.keys(query).map(key => key + '=' + ((typeof query[key] === 'object') ? JSON.stringify(query[key]) : query[key])).join('&');
    // url += Object.keys(query).map(key => key + '=' + query[key]).join('&');
    return url;
  }

  post(url: string, body?: any, query?: any) {
    return new Promise((resolve, reject) => {
      this.http.post(Api.buildUrl(url, query), JSON.stringify(body), { headers: Api.headers })
        .map(res => res.text() === '' ? res.text() : res.json())
        .subscribe(
          data => resolve(data),
          err => reject(new Error(err))
        );
    });
  }

  get(url: string, query?: any) {
    return new Promise((resolve, reject) => {
      this.http.get(Api.buildUrl(url, query), { headers: Api.headers })
        .map(res => res.text() === '' ? res.text() : res.json())
        .subscribe(
          data => resolve(data),
          err => reject(new Error(err))
        );
    });
  }

  put(url: string, body: any, query?: any) {
    return new Promise((resolve, reject) => {
      this.http.put(Api.buildUrl(url, query), JSON.stringify(body), { headers: Api.headers })
        .map(res => res.text() === '' ? res.text() : res.json())
        .subscribe(
          data => resolve(data),
          err => reject(new Error(err))
        );
    });
  }

  delete(url: string, query?: any) {
    return new Promise((resolve, reject) => {
      this.http.delete(Api.buildUrl(url, query), { headers: Api.headers })
        .map(res => res.text() === '' ? res.text() : res.json())
        .subscribe(
          data => resolve(data),
          err => reject(new Error(err))
        );
    });
  }
}
