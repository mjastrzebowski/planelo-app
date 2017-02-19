import { Component, Input, ViewChildren } from '@angular/core';

import { ExerciseStore } from 'app/core/exercise/exercise-store';


@Component({
  selector: 'exercise-list',
  templateUrl: 'exercise-list.html'
})
export class ExerciseList {
  @Input() filter: any;
  @Input() limit: any;
  @ViewChildren('exercises') exercises: any;

  constructor(
    public exerciseStore: ExerciseStore
  ) {
    this.exercises = [];
  }
}
