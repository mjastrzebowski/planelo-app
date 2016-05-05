import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';


@Injectable()
export class CycleData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/cycles');
  }

  load() {
    console.log('[CY-DATA] load');
    if (this.data) {
      console.log('[CY-DATA] load local');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[CY-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[CY-DATA] api response');
        resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  addCycleByClient(username, cycle) {
    console.log('[CY-DATA] add cycle', username, cycle);

    return this.apiRef.push({
      client: username,
      id: cycle.id,
      size: cycle.size
    }).key();
  }

  getLastCycleByClient(username) {
    console.log('[CY-DATA] get last cycle by client', username);
    return new Promise(resolve => {
      // console.log('[CY-DATA] api listens');
      this.apiRef.orderByKey().limitToLast(1).once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getCyclesByClient(username) {
    console.log('[CY-DATA] get cycles by client', username);
    // return this.load().then(data => {
    //   console.log('test data', data);
    //   return data;
    // });
    return new Promise(resolve => {
      // console.log('[CY-DATA] api listens');
      this.apiRef.orderByKey().once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getCycles() {
    console.log('[CY-DATA] get cycles');
    return this.load().then(data => {
      return data;
    });
  }

}
