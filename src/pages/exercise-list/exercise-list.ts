import { Component } from '@angular/core';
// import {ExerciseData} from '../../providers/exercise-data';

@Component({
  templateUrl: 'exercise-list.html'
})
export class ExerciseListPage {
  groups = [];
  exercises = [];

  groupExercises() {
    this.groups = [];
    this.exercises.map(exercise => {
      if (!this.groups[exercise.category[0]]) {
        this.groups[exercise.category[0]] = [];
      }
      this.groups[exercise.category[0]].push(exercise);
    });
    this.groups = Object.keys(this.groups).map(key => this.groups[key]);
  }

  getExercises() {
    // Attach an asynchronous callback to read the data at our posts reference
    this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/exercises');
    this.apiRef.on('value', function(snapshot) {
      let result = snapshot.val();
      this.exercises = Object.keys(result).map(key => result[key]);
      this.groupExercises();

    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code);
    }, this);
  }

  ionViewLoaded() {
    this.getExercises();
  }
}
