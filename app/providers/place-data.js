import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserData} from './user-data';


@Injectable()
export class PlaceData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/places');
  }

  load() {
    console.log('[PL-DATA] load');
    if (this.data) {
      console.log('[PL-DATA] load place');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[PL-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[PL-DATA] api response');
        resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getPlaceById(placeId) {
    console.log('[PL-DATA] get place by ID', placeId);
    return new Promise(resolve => {
      // console.log('[PL-DATA] api listens');
      this.apiRef.orderByChild('id').equalTo(placeId).once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getPlaces() {
    console.log('[PL-DATA] get places');
    return this.load().then(data => {
      return data;
    });
  }

  addPlace(place) {
    console.log('[PL-DATA] add place', place);
    return this.apiRef.push({
      id: place.id,
      name: place.name,
      address: place.address
    }).key();
  }
}
