import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';

import {TrainingData} from './training-data'
import {ClientData} from './client-data'

@Injectable()
export class ExerciseData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData, trainingData: TrainingData, clientData: ClientData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;
    this.trainingData = trainingData;
    this.clientData = clientData;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/exercises');
  }

  load() {
    console.log('[EX-DATA] load');
    if (this.data) {
      console.log('[EX-DATA] load local');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[EX-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[EX-DATA] api response');
        resolve(this.data);
      // let api = this.apiRef;
      // api.on('child_added', function(snapshot) {
      //   String exerciseKey = snapshot.key();
      //   console.log('test key', exerciseKey);
      //   api.child(exerciseKey + '/category').once('value', function(snapshot) {
      //     console.log('test cat', snapshot.val());
      //   });
        // this.data = snapshot.val();
        // resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getExercises() {
    console.log('[EX-DATA] get exercises');
    return this.load().then(data => {
      return data;
    });
  }

}
