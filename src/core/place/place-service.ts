import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable';

@Injectable()
export class PlaceService {
  private url: string = 'http://localhost:3000/api/places';

  constructor(private http: Http) { }

  get(): Observable<any> {
    return this.http.get(this.url);
  }

  byId(id: any, range: string): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }
}
