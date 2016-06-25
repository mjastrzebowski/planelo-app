import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {UserData} from './user-data';


@Injectable()
export class WorkoutData {
  apiRef: Firebase; // Initialized Firebase object

  constructor(http: Http, user: UserData) {

    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/workouts');
  }

  load() {
    console.log('[WO-DATA] load');
    if (this.data) {
      console.log('[WO-DATA] load workouts');
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      console.log('[WO-DATA] api listens');
      this.apiRef.on('value', function(snapshot) {
        this.data = snapshot.val();
        console.log('[WO-DATA] api response');
        resolve(this.data);
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getWorkoutById(workoutId) {
    console.log('[WO-DATA] get workout by ID', workoutId);
    return new Promise(resolve => {
      // console.log('[WO-DATA] api listens');
      this.apiRef.orderByChild('id').equalTo(workoutId).once('value', function(snapshot) {
        resolve(snapshot.val());
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }, this);
    });
  }

  getWorkouts() {
    console.log('[WO-DATA] get workouts');
    return this.load().then(data => {
      return data;
    });
  }

  addWorkout(workout) {
    console.log('[WO-DATA] add workout', workout);
    return this.apiRef.push({
      id: workout.id,
      client: workout.client,
      place: workout.place,
      trainer: workout.trainer,
      plan: workout.plan,
      datetime: '2016-02-26T18:00'
      date: '2016-02-26',
      timeStart: '18:00',
      timeEnd: '19:00'
    }).key();
  }
}
