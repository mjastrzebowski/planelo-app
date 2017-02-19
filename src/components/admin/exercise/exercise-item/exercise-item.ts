import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { IExercise } from 'app/core/exercise/exercise';
import { ExerciseStore } from 'app/core/exercise/exercise-store';

// import { ExerciseDetailPage } from 'app/pages/admin/exercise/exercise-detail/exercise-detail';


@Component({
  selector: 'exercise-item',
  templateUrl: 'exercise-item.html'
})
export class ExerciseItem {
  @Input() model: IExercise;
  nav: any;

  constructor(
    private app: App,
    private exerciseStore: ExerciseStore
  ) {}

  delete(): void {
    this.exerciseStore.removeExercise(this.model);
  }

  goToExerciseDetail(exercise) {
    this.nav = this.app.getActiveNav();
    // this.nav.push(ExerciseDetailPage, exercise);
  }
}
