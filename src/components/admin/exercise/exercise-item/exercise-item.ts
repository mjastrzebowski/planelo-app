import { Component, Input } from '@angular/core';

import { App } from 'ionic-angular';

import { Utils } from 'app/providers/utils';

import { IExercise } from 'app/services/exercise/exercise';
import { ExerciseStore } from 'app/services/exercise/exercise-store';

import { ExerciseDetailPage } from 'app/pages/admin/exercise/exercise-detail/exercise-detail';


@Component({
  selector: 'exercise-item',
  templateUrl: 'exercise-item.html'
})
export class ExerciseItem {
  @Input() model: IExercise;
  nav: any;

  constructor(
    private app: App,
    private utils: Utils,
    private exerciseStore: ExerciseStore
  ) {}

  delete(): void {
    this.exerciseStore.delete(this.model.id).then(() => {
      this.utils.showMessage('Ćwiczenie usunięte.');
    });
  }

  goToExerciseDetail(exercise) {
    this.nav = this.app.getActiveNav();
    this.nav.push(ExerciseDetailPage, exercise);
  }
}
