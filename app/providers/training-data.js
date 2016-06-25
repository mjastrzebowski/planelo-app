import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserData} from './user-data';


@Injectable()
export class TrainingData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/trainings');
  }

  load() {
    console.log('[TR-DATA] load');
    if (this.data) {
      console.log('[TR-DATA] load local');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[TR-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[TR-DATA] api response');
        resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getClientMaxSet(exercise) {
    console.log('[TR-DATA] client max set', this.user.username, exercise);

    let maxSet = exercise.basicSet;
    this.data.forEach(training => {
      if (training.exercises && (training.client === this.user.username || training.client.username === this.user.username)) {
        if (!Array.isArray(training.exercises)) {
          if (training.exercises[exercise.key] && training.exercises[exercise.key].sets) {
            training.exercises[exercise.key].sets.forEach(set => {
              if (set.weight > maxSet.weight) {
                maxSet = Object.assign({}, set);
              }
            });
          }
        } else {
          training.exercises.forEach(ex => {
            if (ex.key === exercise.key && ex.sets) {
              ex.sets.forEach(set => {
                if (set.weight > maxSet.weight) {
                  maxSet = Object.assign({}, set);
                }
              });
            }
          });
        }
      }
    });

    return maxSet;
  }

  getTrainings() {
    console.log('[TR-DATA] get trainings');
    return this.load().then(data => {
      return data;
    });
  }

}
