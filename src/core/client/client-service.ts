import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClientService {
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private url: string = 'http://localhost:3000/api/clients';

  constructor(private http: Http) { }

  get(): Observable<any> {
    return this.http.get(this.url);
  }

  put(body: any): Observable<any> {
    return this.http.put(this.url, JSON.stringify(body), { headers: this.headers });
  }
}
