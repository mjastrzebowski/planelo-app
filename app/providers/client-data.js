import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';


@Injectable()
export class ClientData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/clients');
  }

  load() {
    console.log('[CL-DATA] load');
    if (this.data) {
      console.log('[CL-DATA] load local');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[CL-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[CL-DATA] api response');
        resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getClientByUsername(username) {
    console.log('[CL-DATA] get client by username', username);
    return new Promise(resolve => {
      // console.log('[CL-DATA] api listens');
      this.apiRef.orderByChild('username').equalTo(username).once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getClients() {
    console.log('[CL-DATA] get clients');
    return this.load().then(data => {
      return data;
    });
  }

  addClient(client) {
    console.log('[CL-DATA] add client', client);
    return this.apiRef.push({
      username: client.username,
      name: client.name,
      age: client.age
    }).key();
  }
}
